Vue.use(VTooltip);

new Vue({
  el: app,
  data: {
    weapons: [
      { name: "Axe", image: "images/weapons/Axe.webp" },
      { name: "Bone", image: "images/weapons/Bone.webp" },
      { name: "Carrello", image: "images/weapons/Carrello.webp" },
      { name: "Cherry_Bomb", image: "images/weapons/Cherry_Bomb.webp" },
      { name: "Clock_Lancet", image: "images/weapons/Clock_Lancet.webp" },
      { name: "Cross", image: "images/weapons/Cross.webp" },
      {
        name: "Eight_The_Sparrow",
        image: "images/weapons/Eight_The_Sparrow.webp",
      },
      { name: "Evony_Wings", image: "images/weapons/Evony_Wings.webp" },
      { name: "Fire_Wand", image: "images/weapons/Fire_Wand.webp" },
      { name: "Garlic", image: "images/weapons/Garlic.webp" },
      { name: "King_Bible", image: "images/weapons/King_Bible.webp" },
      { name: "Knife", image: "images/weapons/Knife.webp" },
      { name: "Laurel", image: "images/weapons/Laurel.webp" },
      { name: "Lightning_Ring", image: "images/weapons/Lightning_Ring.webp" },
      { name: "Magic_Wand", image: "images/weapons/Magic_Wand.webp" },
      { name: "Peachone", image: "images/weapons/Peachone.webp" },
      { name: "Pentagram", image: "images/weapons/Pentagram.webp" },
      {
        name: "Phiera_Der_Tuphello",
        image: "images/weapons/Phiera_Der_Tuphello.webp",
      },
      { name: "Runetracer", image: "images/weapons/Runetracer.webp" },
      { name: "Santa_Water", image: "images/weapons/Santa_Water.webp" },
      { name: "Song_of_Mana", image: "images/weapons/Song_of_Mana.webp" },
      { name: "Whip", image: "images/weapons/Whip.webp" },
    ],
    items: [
      { name: "Armor", image: "images/items/Armor.webp" },
      { name: "Attractorb", image: "images/items/Attractorb.webp" },
      //{ name: "Banish", image: "images/items/Banish.webp" },
      { name: "Bracer", image: "images/items/Bracer.webp" },
      { name: "Candelabrador", image: "images/items/Candelabrador.webp" },
      { name: "Clover", image: "images/items/Clover.webp" },
      { name: "Crown", image: "images/items/Crown.webp" },
      { name: "Duplicator", image: "images/items/Duplicator.webp" },
      { name: "Empty_Tome", image: "images/items/Empty_Tome.webp" },
      { name: "Hollow_Heart", image: "images/items/Hollow_Heart.webp" },
      { name: "Pummarola", image: "images/items/Pummarola.webp" },
      //{ name: "Reroll", image: "images/items/Reroll.webp" },
      { name: "Scull_O_Maniac", image: "images/items/Scull_O_Maniac.webp" },
      //{ name: "Skip", image: "images/items/Skip.webp" },
      { name: "Spell_Binder", image: "images/items/Spell_Binder.webp" },
      { name: "Spinach", image: "images/items/Spinach.webp" },
      { name: "Stone_Mask", image: "images/items/Stone_Mask.webp" },
      { name: "Tiragisu", image: "images/items/Tiragisu.webp" },
      { name: "Wings", image: "images/items/Wings.webp" },
    ],
    evoweapons: [],
    selects: { weapons: [], evoweapons: [], items: [] },
    showevo: false,
    frames: {
      blueframe: "images/frames/blueframe_transparent.png",
      redframe: "images/frames/redframe_transparent.png",
    },
  },
  methods: {
    toggleweapons: function () {
      this.showevo = !this.showevo;
    },
    updateitems: function (item) {
      if (this.selects.items.indexOf(item) == -1) {
        this.selects.items.push(item);
      } else {
        this.selects.items = this.selects.items.filter(function (element) {
          return element != item;
        });
      }
      this.checkrequirement();
    },
    updateweapons: function (weapon) {
      if (this.selects.weapons.indexOf(weapon) == -1) {
        this.selects.weapons.push(weapon);
      } else {
        this.selects.weapons = this.selects.weapons.filter(function (element) {
          return element != weapon;
        });
      }
      this.checkrequirement();
    },
    updateevoweapons: function (evoweapon) {
      let self = this;
      if (self.selects.evoweapons.indexOf(evoweapon) == -1) {
        evoweapon.req.forEach(function (ele) {
          if (self.items.includes(ele)) {
            self.selects.items.push(ele);
          } else if (self.weapons.includes(ele)) {
            self.selects.weapons.push(ele);
          }
        });
      } else {
        evoweapon.req.forEach(function (ele) {
          if (self.items.includes(ele)) {
            self.selects.items = self.selects.items.filter(
              (item) => item != ele
            );
          } else if (self.weapons.includes(ele)) {
            self.selects.weapons = self.selects.weapons.filter(
              (weapon) => weapon != ele
            );
          }
        });
      }
      this.checkrequirement();
    },
    checkrequirement: function () {
      let self = this;
      let evolist = [];
      self.evoweapons.forEach(function (evoweapon) {
        //進化武器ごとに調査
        if (
          evoweapon != undefined &&
          evoweapon.req.every(function (val) {
            return (
              self.selects.weapons.includes(val) ||
              self.selects.items.includes(val)
            );
          })
        ) {
          //表示
          evolist.push(evoweapon);
        }
      });
      evolist.forEach(function (ele) {
        if (
          self.selects.evoweapons == undefined ||
          !self.selects.evoweapons.includes(ele)
        ) {
          self.selects.evoweapons.push(ele);
        }
      });
      if (self.selects.evoweapons != undefined) {
        self.selects.evoweapons = self.selects.evoweapons.filter(function (
          ele
        ) {
          return evolist.includes(ele);
        });
      }
    },
  },
  mounted: function () {
    function returnreqObject(namelist, self) {
      let weaponlist = self.weapons.filter(function (element) {
        return namelist.indexOf(element.name) != -1;
      });
      let itemlist = self.items.filter(function (element) {
        return namelist.indexOf(element.name) != -1;
      });
      return weaponlist.concat(itemlist);
    }

    let self = this;
    this.evoweapons = [
      {
        name: "Bloody_Tear",
        image: "images/evoweapons/Bloody_Tear.webp",
        req: returnreqObject(["Whip", "Hollow_Heart"], self),
      },
      {
        name: "Death_Spiral",
        image: "images/evoweapons/Death_Spiral.webp",
        req: returnreqObject(["Axe", "Candelabrador"], self),
      },
      {
        name: "Gorgeous_Moon",
        image: "images/evoweapons/Gorgeous_Moon.webp",
        req: returnreqObject(["Pentagram", "Crown"], self),
      },
      {
        name: "Heaven_Sword",
        image: "images/evoweapons/Heaven_Sword.webp",
        req: returnreqObject(["Cross", "Clover"], self),
      },
      {
        name: "Hellfire",
        image: "images/evoweapons/Hellfire.webp",
        req: returnreqObject(["Fire_Wand", "Spinach"], self),
      },
      {
        name: "Holy_Wand",
        image: "images/evoweapons/Holy_Wand.webp",
        req: returnreqObject(["Magic_Wand", "Empty_Tome"], self),
      },
      {
        name: "La_Borra",
        image: "images/evoweapons/La_Borra.webp",
        req: returnreqObject(["Santa_Water", "Attractorb"], self),
      },
      {
        name: "Mannajja",
        image: "images/evoweapons/Mannajja.webp",
        req: returnreqObject(["Song_of_Mana", "Scull_O_Maniac"], self),
      },
      {
        name: "NO_FUTURE",
        image: "images/evoweapons/NO_FUTURE.webp",
        req: returnreqObject(["Runetracer", "Armor"], self),
      },
      {
        name: "Phieraggi",
        image: "images/evoweapons/Phieraggi.webp",
        req: returnreqObject(
          ["Phiera_Der_Tuphello", "Eight_The_Sparrow", "Tiragisu"],
          self
        ),
      },
      {
        name: "Soul_Eater",
        image: "images/evoweapons/Soul_Eater.webp",
        req: returnreqObject(["Garlic", "Pummarola"], self),
      },
      {
        name: "Thousand_Edge",
        image: "images/evoweapons/Thousand_Edge.webp",
        req: returnreqObject(["Knife", "Bracer"], self),
      },
      {
        name: "Thunder_Loop",
        image: "images/evoweapons/Thunder_Loop.webp",
        req: returnreqObject(["Lightning_Ring", "Duplicator"], self),
      },
      {
        name: "Unholy_Vespers",
        image: "images/evoweapons/Unholy_Vespers.webp",
        req: returnreqObject(["King_Bible", "Spell_Binder"], self),
      },
      {
        name: "Vandalier",
        image: "images/evoweapons/Vandalier.webp",
        req: returnreqObject(["Peachone", "Evony_Wings"], self),
      },
    ];
  },
});
