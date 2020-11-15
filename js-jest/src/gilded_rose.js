class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  isConjuredItem(item) {
    return item.name.toLowerCase().includes('conjured');
  }

  cleanNameValue(name) {
    return name.replace(/conjured /i, '');
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.cleanNameValue(this.items[i].name) != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      let degradation = 1;
      if (this.isConjuredItem(this.items[i])) {
        degradation = 2;
      }
      
      if (this.cleanNameValue(this.items[i].name) != 'Aged Brie' && this.cleanNameValue(this.items[i].name) != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.cleanNameValue(this.items[i].name) != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - degradation;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.cleanNameValue(this.items[i].name) == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.items[i].sellIn < 0) {
        if (this.cleanNameValue(this.items[i].name) != 'Aged Brie') {
          if (this.cleanNameValue(this.items[i].name) != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.cleanNameValue(this.items[i].name) != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - degradation;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }

      if (this.items[i].quality < 0) {
        this.items[i].quality = 0;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
