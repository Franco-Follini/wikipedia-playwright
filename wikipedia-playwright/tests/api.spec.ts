import { test, expect } from '@playwright/test';

test.describe('Wikipedia API tests', () => {
  test('GET de información básica de una página de Wikipedia', async ({ request }) => {
    // Hago un GET a una página real de Wikipedia
    const response = await request.get(
      'https://en.wikipedia.org/w/rest.php/v1/page/Wikipedia/bare'
    );

    // Valido que la respuesta sea exitosa
    expect(response.status()).toBe(200);

    // Convierto la respuesta a JSON
    const body = await response.json();

    // Verifico datos básicos de la página
    expect(body.title).toBe('Wikipedia');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('key');
  });

  test('POST para transformar wikitext a HTML en Wikipedia', async ({ request }) => {
    // Defino un texto simple en formato wikitext
    const payload = {
      wikitext: '== Hola Wikipedia ==',
    };

    // Hago un POST a un endpoint de Wikipedia que transforma wikitext a HTML
    const response = await request.post(
      'https://en.wikipedia.org/w/rest.php/v1/transform/wikitext/to/html/Wikipedia',
      {
        data: payload,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Valido que la respuesta sea correcta
    expect(response.status()).toBe(200);

    // Como este endpoint devuelve HTML, leo la respuesta como texto
    const body = await response.text();

    // Verifico que el HTML generado contenga el texto enviado
    expect(body).toContain('Hola Wikipedia');
  });
});