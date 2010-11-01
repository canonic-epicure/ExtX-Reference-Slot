StartTest(function(t) {
    
	t.plan(4)
    
    var async0 = t.beginAsync()
    
    use('ExtX.Reference.Slot', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Basics')
        
        var panel = new Ext.Panel({
            renderTo : Ext.getBody(),
            
            width : 300,
            height : 200,
            
            slots : true,
            
            items : [
                {
                    title : 'Test item'
                },
                {
                    title : 'Test submenu',
                    items : [ 
                        {
                            slot : 'sub1',
                            title : 'Test sub-item1'
                        },
                        {
                            title : 'Test sub-item2'
                        }
                    ]
                },
                {
                    title : 'Test item2',
                    iconCls: 'calendar',
                    slot : 'item2'
                }
            ]
        })
                    
        t.ok(panel.slots.sub1.title == 'Test sub-item1', 'Nested component is available via its slot #1')
        t.ok(panel.slots.item2.title == 'Test item2', 'Nested component is available via its slot #2')
        
        //======================================================================================================================================================================================================================================================
        t.diag('Siblings')
        
        var sub1 = panel.slots.sub1
        
        t.ok(sub1.siblingSlots.item2.title == 'Test item2', "Components can access each other via 'siblingSlots'")
        

        //======================================================================================================================================================================================================================================================
        t.diag('Dynamic add')
        
        panel.add({
            slot : 'dynamic',
            title : 'Test dynamic item'
        })
        
        t.ok(panel.slots.dynamic.title == 'Test dynamic item', 'Dynamic addition works')
        
        t.endAsync(async0)
    })
})    