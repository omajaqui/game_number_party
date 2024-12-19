const wordsAndTranslations = [
  { number: 1, name: 'uno', translate: 'one', },
  { number: 2, name: 'dos', translate: 'two', },
  { number: 3, name: 'tres', translate: 'three', },
  { number: 4, name: 'cuatro', translate: 'four', },
  { number: 5, name: 'cinco', translate: 'five', },
  { number: 6, name: 'seis', translate: 'six', },
  { number: 7, name: 'siete', translate: 'seven', },
  { number: 8, name: 'ocho', translate: 'eight', },
  { number: 9, name: 'nueve', translate: 'nine', },
  { number: 10, name: 'diez', translate: 'ten', },
];

export function removeAccents(str) {
  return str
    .normalize("NFD") // Separa caracteres base de sus diacríticos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
    .replace(/ñ/g, "ñ") // Asegura que las "ñ" no sean modificadas
    .replace(/Ñ/g, "Ñ"); // Asegura que las "Ñ" no sean modificadas
}

export function capitaliceWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getTranslate(number) {
  const found = wordsAndTranslations.find(item => item.number === number);
  return found ? capitaliceWord(found.translate) : null;
}

export function validateFix(number) {
  const found = wordsAndTranslations.find(item => item.number === number);
  return found ? capitaliceWord(found.name) : null;
}