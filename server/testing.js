var items = require('./schemas/items');

items.sync().then(function() {
  return items.create({
    item: 'Kenya',
    quantity: 40000000
  });
});
