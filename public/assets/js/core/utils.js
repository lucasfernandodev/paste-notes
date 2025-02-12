export const createEl = (type, content, attributes = {}) => {
  const el = document.createElement(type);
  el.textContent = content || '';

  for (const [label, value] of Object.entries(attributes)) {
    el.setAttribute(label, value)
  }

  return el;
}
 
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}


export async function copyToClipboard(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
  } else {

    const t = createEl('textarea', textToCopy, {
      style: {
        whiteSpace: 'pre',
        wrap: 'off',
        position: "absolute",
        left: "-999999px"
      }
    })

      document.body.prepend(t);
      t.select();

      try {
          document.execCommand('copy');
      } catch (error) {
          console.error(error);
      } finally {
          t.remove();
      }
  }
}

export class ApiError extends Error {
  /**
   * Cria uma instância de ApiError.
   * @param {string} message - Mensagem de erro.
   * @param {number} status - Código de status HTTP retornado pela API.
   * @param {any} data - Dados adicionais da resposta.
   */
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError'; // Nome do erro 
    this.status = status;   // Código de status HTTP
    this.data = data;       // Dados adicionais da resposta
  }

  toString() {
    return this.message;
  }
}

export const safeFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options); 
    // Tenta converter a resposta para JSON

    if(response.status === 204) return true;
    
    const data = await response.json();

    // Se o response não for ok (status HTTP fora da faixa 200-299), lança um erro personalizado
    if (!response.ok) {
      throw new ApiError(
        data?.msg || 'Erro na resposta da API',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    console.log('Erro ao processar solicitação', error.message);

    if (error instanceof ApiError) {
      // Se o erro já for uma instância de ApiError, relança-o
      throw new ApiError(error.message, error.status, error.data);
    }

    // Para outros tipos de erro, lança um erro genérico
    throw new Error('Erro ao processar solicitação');
  }
}