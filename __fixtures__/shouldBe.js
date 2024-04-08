const shouldBeStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`

const shouldBePlain =`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

const shouldBeJSON = `{
  "common": {
    "case": "nested",
    "value": {
      "follow": {
        "case": "added",
        "value": false
      },
      "setting1": {
        "case": "equal",
        "value": "Value 1"
      },
      "setting2": {
        "case": "deleted",
        "value": 200
      },
      "setting3": {
        "case": "updated",
        "previousValue": true,
        "newValue": null
      },
      "setting4": {
        "case": "added",
        "value": "blah blah"
      },
      "setting5": {
        "case": "added",
        "value": {
          "key5": "value5"
        }
      },
      "setting6": {
        "case": "nested",
        "value": {
          "doge": {
            "case": "nested",
            "value": {
              "wow": {
                "case": "updated",
                "previousValue": "",
                "newValue": "so much"
              }
            }
          },
          "key": {
            "case": "equal",
            "value": "value"
          },
          "ops": {
            "case": "added",
            "value": "vops"
          }
        }
      }
    }
  },
  "group1": {
    "case": "nested",
    "value": {
      "baz": {
        "case": "updated",
        "previousValue": "bas",
        "newValue": "bars"
      },
      "foo": {
        "case": "equal",
        "value": "bar"
      },
      "nest": {
        "case": "updated",
        "previousValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    }
  },
  "group2": {
    "case": "deleted",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  "group3": {
    "case": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
}`

export { shouldBeStylish, shouldBePlain, shouldBeJSON };
