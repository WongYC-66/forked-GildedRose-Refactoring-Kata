const {Shop, Item} = require("../src/gilded_rose");

describe("Shop - Gilded Rose", function() {
  it("creates Item and store in correct index after update sellIn and Quality", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)])
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("updateQuality", function() {
  it("decreases SellIn by 1", function() {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("decreases Quality by 1", function() {
    const gildedRose = new Shop([new Item("foo", 1, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
  });

  it("decreases Quality by 2 when expired", function() {
    const gildedRose = new Shop([new Item("foo", 0, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  it("remains 0 Quality as minimum", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("increases 'Aged Brie' quality", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("increases 'Aged Brie' quality twice when expired", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("remains 50 quality as maximum", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("does not modify Sulfuras's Quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it("increases quality of Backstage Passes by 1", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("increases quality of Backstage Passes by 2 when 10 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("increases quality of Backstage Passes by 3 when 5 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  it("set quality of Backstage Passes to 0 when expired", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("decreases Conjured Quality by 2", function() {
    const gildedRose = new Shop([new Item("Conjured", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("decreases Conjured Quality by 4 when expired", function() {
    const gildedRose = new Shop([new Item("Conjured", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

});
