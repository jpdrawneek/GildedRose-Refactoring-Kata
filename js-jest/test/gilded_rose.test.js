const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe.each`
  label | item | sellIn | quality | expectedSellIn | expectedQuality
  ${'widget A'} | ${'widget A'} | ${10} | ${10} | ${9} | ${9}
  ${'widget A out of date'} | ${'widget A'} | ${0} | ${10} | ${-1} | ${8}
  ${'widget B'} | ${'widget B'} | ${10} | ${0} | ${9} | ${0}
  ${'Aged Brie normal'} | ${'Aged Brie'} | ${10} | ${10} | ${9} | ${11}
  ${'Aged Brie out of date'} | ${'Aged Brie'} | ${-1} | ${10} | ${-2} | ${12}
  ${'Aged Brie max'} | ${'Aged Brie'} | ${10} | ${50} | ${9} | ${50}
  ${'Sulfuras normal'} | ${'Sulfuras, Hand of Ragnaros'} | ${10} | ${10} | ${10} | ${10}
  ${'Backstage passes'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${20} | ${10} | ${19} | ${11}
  ${'Backstage passes 10 days'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${11} | ${10} | ${10} | ${12}
  ${'Backstage passes 5 days'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${6} | ${10} | ${5} | ${13}
  ${'Backstage passes 5 days max'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${6} | ${50} | ${5} | ${50}
  ${'Backstage passes passed'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${0} | ${10} | ${-1} | ${0}
  `('Standard item: "$label"', ({label, item, sellIn, quality, expectedSellIn, expectedQuality}) => {
    let items;

    beforeEach(() =>{
      const gildedRose = new Shop([new Item(item, sellIn, quality)]);
      items = gildedRose.updateQuality();
    });

    it('Should only be one item', () => {
      expect(items).toHaveLength(1);
    });

    it('Item sell-in value should be updated correctly', () => {
      expect(items[items.length - 1].sellIn).toEqual(expectedSellIn);
    });

    it('Item quality value should be updated correctly', () => {
      expect(items[items.length - 1].quality).toEqual(expectedQuality);
    });
  });

  describe.each`
  label | item | sellIn | quality | expectedSellIn | expectedQuality
  ${'widget A'} | ${'widget A'} | ${10} | ${10} | ${9} | ${8}
  ${'widget A out of date'} | ${'widget A'} | ${0} | ${10} | ${-1} | ${6}
  ${'widget B'} | ${'widget B'} | ${10} | ${0} | ${9} | ${0}
  ${'widget B out of date'} | ${'widget B'} | ${0} | ${1} | ${-1} | ${0}
  ${'Aged Brie normal'} | ${'Aged Brie'} | ${10} | ${10} | ${9} | ${11}
  ${'Aged Brie out of date'} | ${'Aged Brie'} | ${-1} | ${10} | ${-2} | ${12}
  ${'Aged Brie max'} | ${'Aged Brie'} | ${10} | ${50} | ${9} | ${50}
  ${'Sulfuras normal'} | ${'Sulfuras, Hand of Ragnaros'} | ${10} | ${10} | ${10} | ${10}
  ${'Backstage passes'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${20} | ${10} | ${19} | ${11}
  ${'Backstage passes 10 days'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${11} | ${10} | ${10} | ${12}
  ${'Backstage passes 5 days'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${6} | ${10} | ${5} | ${13}
  ${'Backstage passes 5 days max'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${6} | ${50} | ${5} | ${50}
  ${'Backstage passes passed'} | ${'Backstage passes to a TAFKAL80ETC concert'} | ${0} | ${10} | ${-1} | ${0}
  `('Conjured items: $label', ({label, item, sellIn, quality, expectedSellIn, expectedQuality}) => {
    let items;

    beforeEach(() =>{
      const gildedRose = new Shop([new Item(`Conjured ${item}`, sellIn, quality)]);
      items = gildedRose.updateQuality();
    });

    it('Should only be one item', () => {
      expect(items).toHaveLength(1);
    });

    it('Item sell-in value should be updated correctly', () => {
      expect(items[items.length - 1].sellIn).toEqual(expectedSellIn);
    });

    it('Item quality value should be updated correctly', () => {
      expect(items[items.length - 1].quality).toEqual(expectedQuality);
    });
  });
});
