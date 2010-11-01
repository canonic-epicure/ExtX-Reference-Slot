var Harness
var isNode        = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
var INC = (isNode ? require.paths : []).concat('../lib', '/jsan')


Harness.configure({
    title     : 'ExtX.Reference.Slot Test Suite',
    
    preload : [
        'jsan:Task.Joose.Core',
        
        "jsan:Task.ExtJS.Adapter.Ext",
        
        'jsan:JooseX.Bridge.Ext',
        'jsan:JooseX.Bridge.Ext.Convertor',
        
        "jsan:Task.ExtJS.All",
    
        "ExtX.Reference.Slot"
    ]
})


Harness.start(
    '010_sanity.t.js',
    '020_basics.t.js'
)

