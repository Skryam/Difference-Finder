const shouldBe = `{
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
    "case": "sameKeysObjects",
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
        "case": "sameKeyDiffValue",
        "value": [
          true,
          null
        ]
      },
      "setting4": {
        "case": "added",
        "value": "blah blah"
      },
      "setting5": {
        "case": "addedObject",
        "value": {
          "key5": {
            "case": "equal",
            "value": "value5"
          }
        }
      },
      "setting6": {
        "case": "sameKeysObjects",
        "value": {
          "doge": {
            "case": "sameKeysObjects",
            "value": {
              "wow": {
                "case": "sameKeyDiffValue",
                "value": [
                  "",
                  "so much"
                ]
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
    "case": "sameKeysObjects",
    "value": {
      "baz": {
        "case": "sameKeyDiffValue",
        "value": [
          "bas",
          "bars"
        ]
      },
      "foo": {
        "case": "equal",
        "value": "bar"
      },
      "nest": {
        "case": "firstObjSecondNot",
        "value": [
          {
            "key": {
              "case": "equal",
              "value": "value"
            }
          },
          "str"
        ]
      }
    }
  },
  "group2": {
    "case": "deletedObject",
    "value": {
      "abc": {
        "case": "equal",
        "value": 12345
      },
      "deep": {
        "case": "sameKeysObjects",
        "value": {
          "id": {
            "case": "equal",
            "value": 45
          }
        }
      }
    }
  },
  "group3": {
    "case": "addedObject",
    "value": {
      "deep": {
        "case": "sameKeysObjects",
        "value": {
          "id": {
            "case": "sameKeysObjects",
            "value": {
              "number": {
                "case": "equal",
                "value": 45
              }
            }
          }
        }
      },
      "fee": {
        "case": "equal",
        "value": 100500
      }
    }
  }
}`

export { shouldBe, shouldBePlain, shouldBeJSON };
