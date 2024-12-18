class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    // this.items = items;
    // this.items = items.map(item => new ShopableItem(item));
    this.items = items.map(item => ShopableItem.for(item));
  }
  updateQuality() {
    // this.items.forEach(this.updateItemQuality.bind(this))
    this.items.forEach(item => {
      item.updateQuality()
      item.updateSellIn()
    })
    return this.items;
  }
}

class ShopableItem extends Item {

  static for(item) {
    // factory
    // let shopableItem = this.registry.find(registry => registry.canHandle(item.name))
    let shopableItem = null
    switch (item.name) {
      case 'Aged Brie':
        shopableItem = ShopableAgedBrid
        break
      case 'Sulfuras, Hand of Ragnaros':
        shopableItem = ShopableSulfuras
        break
      case 'Backstage passes to a TAFKAL80ETC concert':
        shopableItem = ShopableBackstagePass
        break
      case 'Conjured':
        shopableItem = ShopableConjured
        break
      default:
        shopableItem = ShopableItem
        break
    }


    return new shopableItem(item)
  }

  constructor(item) {
    super(item.name, item.sellIn, item.quality)
  }

  updateQuality() {
    if (this.sellIn == 0) {
      this.quality -= 2
    } else {
      this.quality -= 1
    }
    this.quality = this.capLimit(this.quality)
    return 


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

class ShopableAgedBrid extends ShopableItem {
  updateQuality() {
    console.log(this)
    if (this.sellIn == 0) {
      this.quality += 2
    } else {
      this.quality += 1
    }
    this.quality = this.capLimit(this.quality)
  }
}

class ShopableSulfuras extends ShopableItem {
  updateQuality() {
    // do nothing
  }
}

class ShopableBackstagePass extends ShopableItem {
  updateQuality() {
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
  }
}

class ShopableConjured extends ShopableItem {
  updateQuality() {
    if (this.sellIn == 0) {
      this.quality -= 4
    } else {
      this.quality -= 2
    }
    this.quality = this.capLimit(this.quality)
  }
}

ShopableItem.registry = []
ShopableItem.registry.push(ShopableAgedBrid)
ShopableItem.registry.push(ShopableSulfuras)
ShopableItem.registry.push(ShopableBackstagePass)
ShopableItem.registry.push(ShopableConjured)

module.exports = {
  Item,
  Shop
}
