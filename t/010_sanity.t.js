StartTest(function(t) {
    
	t.plan(1)
    
    var async0 = t.beginAsync()
    
    use('ExtX.Reference.Slot', function () {
        
        //======================================================================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(ExtX.Reference.Slot, "ExtX.Reference.Slot is here")
        
        t.endAsync(async0)
    })
})    