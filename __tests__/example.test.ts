/**
 * Test de ejemplo para un componente/utilidad simple
 * Este archivo muestra cómo estructurar tests básicos
 */

describe('Ejemplo de Test Básico', () => {
  it('debe pasar una suma simple', () => {
    const resultado = 2 + 2;
    expect(resultado).toBe(4);
  });

  it('debe validar que un array contiene un elemento', () => {
    const array = [1, 2, 3, 4, 5];
    expect(array).toContain(3);
  });

  it('debe validar la estructura de un objeto', () => {
    const usuario = {
      nombre: 'Juan',
      edad: 25,
      activo: true,
    };

    expect(usuario).toEqual({
      nombre: 'Juan',
      edad: 25,
      activo: true,
    });
  });

  it('debe validar que una función se llama', () => {
    const mockFunction = jest.fn();
    mockFunction('test');

    expect(mockFunction).toHaveBeenCalledWith('test');
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
