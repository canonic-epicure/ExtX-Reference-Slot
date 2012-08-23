[![build status](https://secure.travis-ci.org/SamuraiJack/ExtX-Reference-Slot.png)](http://travis-ci.org/SamuraiJack/ExtX-Reference-Slot)
Name
====

ExtX.Reference.Slot - ExtJS extension for accessing components hierarchy with mnemonic names


SYNOPSIS
========

Include this extension after the bridged ExtJS

        <!-- Joose  -->
        <script type="text/javascript" src="/jsan/Task/Joose/Core.js"></script>
        
    
        <!-- ExtJS bridged  -->
        <script type="text/javascript" src="ext-3.3.1/adapter/ext/ext-base.js"></script>
        
        <script type="text/javascript" src="/jsan/JooseX/Bridge/Ext.js"></script>
        <script type="text/javascript" src="/jsan/JooseX/Bridge/Ext/Convertor.js"></script>
        
        <script type="text/javascript" src="ext-3.3.1/ext-all.js"></script>
        
        <!-- eof ExtJS bridged  -->
        
        
        <script type="text/javascript" src="/jsan/ExtX/Reference/Slot.js"></script>
        
        
Then, in your code:

        //declare

        var slotsCollector = new Ext.Panel({
            renderTo : Ext.getBody(),
            
            width : 300,
            height : 200,
            
            slots : true,
            
            items : [
                {
                    title : 'Header'
                },
                {
                    title : 'Just a wrapper',
                    
                    items : [ 
                        {
                            title : 'Sub header',
                            
                            slot : 'subHeader'        <---------
                        },                                     |
                        {                                      |
                            title : 'Content wrapper',         |
                                                               |
                            layout : 'fit',                    |
                                                               |
                            items : [                          |
                                {                              |
                                    title : 'Content',         |
                                                               |
                                    slot : 'content' <------   |
                                }                          |   |
                            ]                              |   |
                        }                                  |   |
                    ]                                      |   |
                },                                         |   |
                {                                          |   |
                    title : 'Footer',                      |   |
                                                           |   |
                    slot : 'footer'                        |   |
                }                                          |   |
            ]                                              |   |
        })                                                 |   |
                                                           |   |        
        //access childs with mnemonic names                |   |        
                                                           |   |        
        var content     = slotsCollector.slots.content   ---   |
        var subHeader   = slotsCollector.slots.subHeader -------
        
        
        //do something
        
        content.on('event', this.eventHandler, this)

INSTALLATION
============

See [Joose docs](http://joose.github.com/Joose) for installation instructions. 

From `npm`:
    
    > [sudo] npm install extx-reference-slot --unsafe-perm=true
    
Tarballs are available for download from <http://search.npmjs.org/#/extx-reference-slot>.


DESCRIPTION
===========

`ExtX.Reference.Slot` allows you to access your child components with their *mnemonic* names.
This greatly simplifies the internal structure of your widgets and make them more flexible.

With this extension you no longer need global id's.

 
USAGE
=====

To access child components via slots, you need to create the container with 'slots' property set to 'true' value:

        var slotsCollector = new Ext.Panel({
            
            slots   : true,
            
            ...
        })

This will establish a "slots collector" in your container. After this, if *any child* of this container, *at any depth*,
will have 'slot' property defined, then that child will be aliased in the slots collector:

        var panel = new Ext.Panel({
            slots   : true,
            
            items : [
                {
                    title : 'Child component #1',
                    slot : 'child1',
                    
                    items : [
                        {
                            title : 'Child component #2',
                            slot : 'child2',
                        }
                    ]
                }
            ]
        })
        
        var child1 = panel.slots.child1
        var child2 = panel.slots.child2
        
        
Note, that the child will be aliased to the *nearest* slots collector, up on the `onwerCt` hierarchy:

        var panel = new Ext.Panel({
            slots   : true,
            
            items : [
                {
                    title : 'Child component #1',
                    slot : 'child1',
                    
                    slots : true, //nested slots collector
                    
                    items : [
                        {
                            title : 'Child component #2',
                            slot : 'child2',
                        }
                    ]
                }
            ]
        })
        
        var child1 = panel.slots.child1

        var child2 = panel.slots.child1.slots.child2
        // or
        var child2 = child1.slots.child2
        
Dynamically added components are handled correctly. Components also clears themselves from slots collector upon destroy.
Handling of dynamic components removing is in the TODO list.   



Advantages compared with 'ref'
------------------------------

ExtJS have built-in mechanism for addressing child components - `ref` property. However it has couple of drawbacks:

- `ref` requires you explicitly specify the parent container in which the reference will be added. 
Thus, if you will move some child component to another nesting level, you'll need to manually update its `ref` property. 

- `ref` adds references directly to the container. Thus, you should avoid of usage of standard or custom properties, 
like `title`, `header`, `footer`, `myCustomProperty` to prevent potential clash.   

This extension is free from these drawbacks.


PROPERTIES
==========

This extension is implemented as two Roles - for Ext.BoxComponent and Ext.Container. Roles add some new properties to those classes:


Ext.BoxComponent
-------------

  - `this.slot`

The name of the slot (alias) under which this component will be accessible in slots collector.

  - `this.siblingSlots`

The 'slots' property of this component's slots collector. Its possible to access sibling components via this property:

        var panel = new Ext.Panel({
            slots   : true,
            
            items : [
                {
                    title : 'Child component #1',
                    slot : 'child1',
                    
                    items : [
                        {
                            title : 'Child component #2',
                            slot : 'child2',
                        }
                    ]
                }
            ]
        })
        
        var child1 = panel.slots.child1
        var child2 = child1.siblingSlots.child2
 


Ext.Container
-------------

  - `this.slots`

The slots collector, into which the components with 'slot' property will be aliased. Should be set to 'true' on construction.



TODO
====

- Handle dynamic 'remove'
- Implement several optimizations (keep the nearest slots collector in some property)



GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/ExtX-Reference-Slot/issues>

You can also ask questions at IRC channel : [#joose](http://webchat.freenode.net/?randomnick=1&channels=joose&prompt=1)
 
Or the mailing list: <http://groups.google.com/group/joose-js>
 


SEE ALSO
========

Bridge from ExtJS class system to Joose: <http://samuraijack.github.com/joosex-bridge-ext>

Joose web-site: <http://joose.it>

General documentation for Joose: <http://joose.github.com/Joose/>




BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/ExtX-Reference-Slot/issues>



AUTHORS
=======

Nickolay Platonov [nplatonov@cpan.org](mailto:nplatonov@cpan.org)



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
