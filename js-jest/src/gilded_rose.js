class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ShopableItem extends Item {
  constructor(item) {
    super(item.name, item.sellIn, item.quality)
  }

  updateQuality() {
    switch (this.name) {
      case 'Aged Brie':
        if (this.sellIn == 0) {
          this.quality += 2
        } else {
          this.quality += 1
        }
        this.quality = this.capLimit(this.quality)
        break
      case 'Sulfuras, Hand of Ragnaros':
        // sulfuras quality don't change
        break
      case 'Backstage passes to a TAFKAL80ETC concert':
        if (this.sellIn == 0) {
          this.quality = 0
        } else if (this.sellIn <= 5) {
          this.quality += 3
        } else if (this.sellIn <= 10) {
          this.quality += 2
        } else {
          this.quality += 1
        }
        this.quality = this.capLimit(this.quality)
        break
      case 'Conjured':
        if (this.sellIn == 0) {
          this.quality -= 4
        } else {
          this.quality -= 2
        }
        this.quality = this.capLimit(this.quality)
        break
      default:
        if (this.sellIn == 0) {
          this.quality -= 2
        } else {
          this.quality -= 1
        }
        this.quality = this.capLimit(this.quality)
        break
    }
  }
  updateSellIn() {
    this.sellIn -= 1
  }

  capLimit(quality) {     // adjust quality to between 0 - 50
    quality = Math.max(quality, 0)
    quality = Math.min(quality, 50)
    return quality
  }
}

class Shop {
  constructor(items = []) {
    // this.items = items;
    this.items = items.map(item => new ShopableItem(item));
  }
  updateQuality() {
    // this.items.forEach(this.updateItemQuality.bind(this))
    this.items.forEach(item => {
      item.updateQuality()
      item.updateSellIn()
    })
    return this.items;
  }
  // updateItemQuality(item) {
  //   switch (item.name) {
  //     case 'Aged Brie':
  //       if (item.sellIn == 0) {
  //         item.quality += 2
  //       } else {
  //         item.quality += 1
  //       }
  //       item.quality = this.capLimit(item.quality)
  //       break
  //     case 'Sulfuras, Hand of Ragnaros':
  //       // sulfuras quality don't change
  //       break
  //     case 'Backstage passes to a TAFKAL80ETC concert':
  //       if (item.sellIn == 0) {
  //         item.quality = 0
  //       } else if (item.sellIn <= 5) {
  //         item.quality += 3
  //       } else if (item.sellIn <= 10) {
  //         item.quality += 2
  //       } else {
  //         item.quality += 1
  //       }
  //       item.quality = this.capLimit(item.quality)
  //       break
  //     case 'Conjured':
  //       if (item.sellIn == 0) {
  //         item.quality -= 4
  //       } else {
  //         item.quality -= 2
  //       }
  //       item.quality = this.capLimit(item.quality)
  //       break
  //     default:
  //       if (item.sellIn == 0) {
  //         item.quality -= 2
  //       } else {
  //         item.quality -= 1
  //       }
  //       item.quality = this.capLimit(item.quality)
  //       break
  //   }
  //   item.sellIn -= 1
  // }

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
