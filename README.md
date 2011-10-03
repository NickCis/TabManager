# TabManager - A simple, unintrusive Tab Maker for prototype
By: NickCis https://github.com/NickCis

## How to use it:
		$(<id of container>).TabManager(<options>);
		Element.TabManager(<id of container>, <options>);
		TabManager(<id of container>, <options>);
		<options> (optional) is a dictionary (see below defaults for an explanation about each keyword)

IMPORTANT: in order to work, the container of the tab system needs to have an id!.

## Structure of html:
		 <div id='ulcontainer'></div>
		 <div id="tabs">
		 	<span>title 1</span>
		 	<div>Content #1</div>
		 	<span>title 2</span>
		 	<div>Content #2</div>
		 	<span>title 3</span>
		 	<div>Content #3</div>
		 </div>

## Example js:
 $('tabs').TabManager({'listId':'ulcontainer'});

See example for further details.

## Functions:
		 showTab(<index>) show the tab of index <index> (the index starts in 0)
		 lengthTabs() returns the number of tabs 
		 lastTab() show the last Tab
		 nextTab() show next tab (if the last last one was selected, the first one is shown)
		 prevTab() show the previous tab (if the first one was seleccted the last is shown)
		 currentTabIndex() returns the current tab index (the index starts from 0)


