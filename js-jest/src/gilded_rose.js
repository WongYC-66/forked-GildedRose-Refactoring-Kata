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
    this.items.forEach(this.updateItemQuality.bind(this))
    return this.items;
  }
  updateItemQuality(item) {
    // console.log(this)
    switch (item.name) {
      case 'Aged Brie':
        if (item.sellIn == 0) {
          item.quality += 2
        } else {
          item.quality += 1
        }
        item.quality = this.capLimit(item.quality)
        break
      case 'Sulfuras, Hand of Ragnaros':
        // sulfuras quality don't change
        break
      case 'Backstage passes to a TAFKAL80ETC concert':
        if (item.sellIn == 0) {
          item.quality = 0
        } else if (item.sellIn <= 5) {
          item.quality += 3
        } else if (item.sellIn <= 10) {
          item.quality += 2
        } else {
          item.quality += 1
        }
        item.quality = this.capLimit(item.quality)
        break
      case 'Conjured':
        if (item.sellIn == 0) {
          item.quality -= 4
        } else {
          item.quality -= 2
        }
        item.quality = this.capLimit(item.quality)
        break
      default:
        if (item.sellIn == 0) {
          item.quality -= 2
        } else {
          item.quality -= 1
        }
        item.quality = this.capLimit(item.quality)
        break
    }
    item.sellIn -= 1
  }

  capLimit(quality) {     // adjust quality to between 0 - 50
    quality = Math.max(quality, 0)
    quality = Math.min(quality, 50)
    return quality
  }
}

module.exports = {
  Item,
  Shop
}
