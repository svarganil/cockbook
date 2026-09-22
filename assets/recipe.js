(() => {
  const recipe = document.querySelector('.recipe-prepare');
  const ingredients = [...recipe.querySelectorAll('.ingredient')];
  const ready = recipe.querySelector('.recipe-ready');
  const directions = recipe.querySelector('.recipe-directions');
  const status = recipe.querySelector('.recipe-status');

  function update() {
    const complete = ingredients.every(item => item.getAttribute('aria-pressed') === 'true');
    recipe.classList.toggle('is-complete', complete);
    directions.setAttribute('aria-disabled', String(!complete));
    ready.inert = complete;
    status.textContent = complete ? "All ingredients ready. You're all set!" :
      `${ingredients.filter(item => item.getAttribute('aria-pressed') === 'true').length} of ${ingredients.length} ingredients ready.`;
  }

  ingredients.forEach(item => item.addEventListener('click', () => {
    const checked = item.getAttribute('aria-pressed') !== 'true';
    item.setAttribute('aria-pressed', String(checked));
    item.classList.toggle('checked', checked);
    update();
  }));

  ready.addEventListener('click', () => {
    ingredients.forEach(item => {
      item.setAttribute('aria-pressed', 'true');
      item.classList.add('checked');
    });
    ingredients[0].focus({ preventScroll: true });
    update();
  });
})();
