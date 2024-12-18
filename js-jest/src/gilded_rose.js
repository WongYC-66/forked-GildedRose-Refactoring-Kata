class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map(item => ShopableItem.for(item));
  }
  updateQuality() {
    this.items.forEach(item => {
      item.updateQuality()
      item.updateSellIn()
    })
    return this.items;
  }
}

class ShopableItem extends Item {
  static canHandle() {
    return true   // fallback or the default class
  }
  static for(item) {
    // factory
    let shopableItem = this.registry.find(registry => registry.canHandle(item.name))  // Open-closed principle
    return new shopableItem(item)
  }
  constructor(item) {
    super(item.name, item.sellIn, item.quality)
  }
  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality -= 2
    } else {
      this.quality -= 1
    }
    this.quality = this.capLimit(this.quality)
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
  static canHandle(name) {
    return name == 'Aged Brie'
  }
  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality += 2
    } else {
      this.quality += 1
    }
    this.quality = this.capLimit(this.quality)
  }
}

class ShopableSulfuras extends ShopableItem {
  static canHandle(name) {
    return name == 'Sulfuras, Hand of Ragnaros'
  }
  updateQuality() {
    // do nothing
  }
}

class ShopableBackstagePass extends ShopableItem {
  static canHandle(name) {
    return name == 'Backstage passes to a TAFKAL80ETC concert'
  }
  updateQuality() {
    if (this.sellIn <= 0) {
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
  static canHandle(name) {
    return name == 'Conjured'
  }
  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality -= 4
    } else {
      this.quality -= 2
    }
    this.quality = this.capLimit(this.quality)
  }
}

// SOLID - Open closed principle
ShopableItem.registry = [ShopableItem]
ShopableItem.registry.unshift(ShopableAgedBrid)
ShopableItem.registry.unshift(ShopableSulfuras)
ShopableItem.registry.unshift(ShopableBackstagePass)
ShopableItem.registry.unshift(ShopableConjured)

module.exports = {
  Item,
  Shop
}
