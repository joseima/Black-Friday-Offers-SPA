
expect(reducer([], { type: 'ADD_TO_CART', payload: { id: 1 } })).toEqual([{ id: 1, quntity: 1 }])