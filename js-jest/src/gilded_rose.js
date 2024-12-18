class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(this.updateItemQuality)
    return this.items;
  }
  updateItemQuality(item) {
    switch (item.name) {
      case 'Aged Brie':
        if (item.sellIn == 0) {
          item.quality += 2
          item.quality = Math.min(item.quality, 50)
        } else {
          item.quality += 1
          item.quality = Math.min(item.quality, 50)
        }
        break
      case 'Sulfuras, Hand of Ragnaros':
        // sulfuras quality don't change
        break
      case 'Backstage passes to a TAFKAL80ETC concert':
        if (item.sellIn == 0) {
          item.quality = 0
        } else if (item.sellIn <= 5) {
          item.quality += 3
          item.quality = Math.min(item.quality, 50)
        } else if (item.sellIn <= 10) {
          item.quality += 2
          item.quality = Math.min(item.quality, 50)
        } else {
          item.quality += 1
          item.quality = Math.min(item.quality, 50)
        }
        break
      case 'Conjured':
        if (item.sellIn == 0) {
          item.quality -= 4
          item.quality = Math.max(item.quality, 0)
        } else {
          item.quality -= 2
          item.quality = Math.max(item.quality, 0)
        }
        break
      default:
        if (item.sellIn == 0) {
          item.quality -= 2
          item.quality = Math.max(item.quality, 0)
        } else {
          item.quality -= 1
          item.quality = Math.max(item.quality, 0)
        }
        break
    }
    item.sellIn -= 1
  }
}

module.exports = {
  Item,
  Shop
}
