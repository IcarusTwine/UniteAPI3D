((window, document, undefined) => {
  const STATS = {
    "BaseHp": 0,
    "BaseAttack": 2,
    "BaseSpecAttack": 4,
    "BaseDef": 3,
    "BaseSpecDef": 5,
    "BaseMoveSpeed": 7,
    "BaseHpRecover": 1,
    "NormalAttackFrequency": 6
  };

  if (window.location.hash) {
    const dex = window.location.hash.substring(1);
    const mon = POKEMON_BASE[dex];
    if (mon === undefined) {
      window.location.href = "../index.html";
    }

    document.title = "UniteApi.dev | " + mon.EnglishName;

    // main header
    ((window, document, dex, mon, undefined) => {
      const target = document.querySelector("#img-holder");
      const template = document.querySelector("#img-holder-content");
      const element = template.content.cloneNode(true);
      const name = mon.EnglishName.toLowerCase();
      const img = element.querySelector("img");
      img.src = "https://unite.pokemon.com/images/pokemon/" + name + "/stat/stat-" + name + ".png";
      const div = element.querySelector("div");
      div.dataset.dex = dex;
      div.textContent = mon.EnglishName;
      target.appendChild(element);
    })(window, document, dex, mon);

    // skins
    ((window, document, dex, mon, undefined) => {
      let target = document.querySelector("#skin-holder");
      let template = document.querySelector("#skin-holder-content");
      let element = template.content.cloneNode(true);
      target.appendChild(element);


      template = document.querySelector("#skin-holder-entry");
      target = document.querySelector("#skin-list");

      const cdnbaseurl = "https://image.pokemon-unitepgame.com/Default";
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "../bins/databin_Pokemon_Avatar_Base.json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState != XMLHttpRequest.DONE) {
          return;
        }
        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
          const dataBin = JSON.parse(xhr.responseText);

          for (var key in dataBin) {
            const val = dataBin[key];
            if (val.PokemonId === mon.PokemonId) {
              const iconpath = val.IconPath;
              const AvatarBaseID = val.PokemonAvatarId;
              const ModelPath = val.InsideAvatar[2];
              element = template.content.cloneNode(true);
              const img = element.querySelector("img");
              img.src = `${cdnbaseurl}/Pokemon/Tachie/${iconpath}.png`;
              img.onclick = () => console.log(AvatarBaseID);
              target.appendChild(element);
            }
          }
        }
      };
      xhr.send();
    })(window, document, dex, mon);

    // data table
    ((window, document, dex, mon, undefined) => {
      const hero = POKEMON_HERO[mon.MainUnitId];
      const growth = POKEMON_STATGROWTH[hero.StatId];
      const target = document.querySelector("#stat-table-holder");
      const template = document.querySelector("#stat-table-holder-content");
      const element = template.content.cloneNode(true);
      const body = element.querySelector("tbody");

      let calced = {};
      calced[0] = {};

      const basecd = ACTIVE_SKILL_HERO[hero.NormalSkillId].CDTime;

      for (const s in STATS) {
        calced[0][s] = hero[s];
      }

      for (let l = 1; l <= 15; l++) {
        let lv = {};
        const pre = calced[l - 1];

        for (const s in STATS) {
          const n = STATS[s];
          lv[s] = pre[s] + growth[l]["Property"][n];
        }
        calced[l] = lv;
      }

      for (let l = 1; l <= 15; l++) {
        let d = calced[l];

        const row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.textContent = l;
        row.appendChild(cell);

        for (let i in d) {
          let n = d[i];
          cell = document.createElement("td");
          if (i === "NormalAttackFrequency") {
            let s = basecd * 10000 / n;
            s /= 1000; // ms
            n = s.toFixed(2) + "s (" + n + ")";
          }
          cell.textContent = n;
          row.appendChild(cell);
        }

        body.appendChild(row);
      }

      target.appendChild(element);
    })(window, document, dex, mon);
  } else {
    window.location.href = "../index.html";
  }
})(window, window.document);
