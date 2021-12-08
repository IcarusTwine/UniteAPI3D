((window, document, undefined) => {
  const SHARE = "https://image.pokemon-unitepgame.com/Default/ShareGet/PokemonGet/";
  const GROWTH = "https://image.pokemon-unitepgame.com/Default/Pokemon/Growth_Whole/";
  const TACHIE = "https://image.pokemon-unitepgame.com/Default/Pokemon/Tachie/";

  const getIconUrl = (icon) => {
    if (icon.startsWith("t_Tachie")) {
      return `${TACHIE}${icon}.png`;
    } else if (icon.startsWith("t_Growth")) {
      return `${GROWTH}${icon}.png`;
    } else if (icon.startsWith("B")) {
      return `${SHARE}${icon}.png`;
    } else {
      return null;
    }
  };

  const template = document.querySelector("#pokemon-list-entry");
  const target = document.querySelector("#pokemon-list");

  for (const dex in POKEMON_BASE) {
    const mon = POKEMON_BASE[dex];

    if (mon.BigIconPath == null || mon.BigIconPath.length < 1 || dex > 5000) {
      continue;
    }

    const element = template.content.cloneNode(true);
    const a = element.querySelector("a");
    a.href = `data/index.html#${dex}`;
    const img = element.querySelector("img");
    img.src = getIconUrl(mon.BigIconPath);
    const div = element.querySelector("div");
    div.dataset.dex = dex;
    target.appendChild(element);
  }
})(window, window.document);
