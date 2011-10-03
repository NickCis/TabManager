/* TabManager - A simple, unintrusive Tab Maker for prototype
 * By: NickCis https://github.com/NickCis
 * 
 * How to use it:
 * $(<id of container>).TabManager(<options>);
 * Element.TabManager(<id of container>, <options>);
 * TabManager(<id of container>, <options>);
 * <options> (optional) is a dictionary (see below defaults for an explanation about each keyword)
 *
 * IMPORTANT: in order to work, the container of the tab system needs to have an id!.
 * 
 * Structure of html:
 *	<div id='ulcontainer'></div>
 *	<div id="tabs">
 *		<span>title 1</span>
 *		<div>Content #1</div>
 *		<span>title 2</span>
 *		<div>Content #2</div>
 *		<span>title 3</span>
 *		<div>Content #3</div>
 *	</div>
 * 
 * Example js:
 *	$('tabs').TabManager({'listId':'ulcontainer'});
 *
 * See example for further details.
 *
 * functions:
 *	showTab(<index>) show the tab of index <index> (the index starts in 0)
 *	lengthTabs() returns the number of tabs 
 *	lastTab() show the last Tab
 *	nextTab() show next tab (if the last last one was selected, the first one is shown)
 *	prevTab() show the previous tab (if the first one was seleccted the last is shown)
 *	currentTabIndex() returns the current tab index (the index starts from 0)
 */

function TabManager(id, argDict) {
	var defaults = {
		'headTag': 'span', //Tag of heads
		'contentTag': 'div', //Tag of content
		'ulListClass': 'TabManagerUl', //Class Applied to the created Ul
		'listId': false, //Id of the container of the Ul
		'tabActiveClass': 'TabManagerActiveTab', //Class applied to the active Li
		'hideFunc':function(obj) { Element.hide($(obj));}, //Function to hide the content div
		'showFunc':function(obj) { Element.show($(obj));}, //Function to showTab
		'defaultTab' : 0 //Default tab to be shown
	}
	argDict =(typeof(argDict) == 'undefined') ? {} : argDict;
	for (i in defaults) { //Extends defaults with argDict
		(typeof(argDict[i]) == 'undefined') && (argDict[i] = defaults[i]);
	}
	this.argDict = argDict;
	if (typeof(id) == 'undefined')
		return false;
	this.containerId = (typeof(id) == 'string') ? id : id.id;
	this.container = $(id);
	var that = this;
	this.Initialice = function() {
		this.heads = $$("#"+this.containerId+" "+this.argDict.headTag);
		this.contents = $$("#"+this.containerId+" "+this.argDict.contentTag);
		var ul = '<ul class="'+this.argDict.ulListClass+'">';
		for (var i=0; i<this.heads.length; i++) {
			this.heads[i].hide();
			ul += '<li indx="'+i+'"><a>'+this.heads[i].innerHTML+'</a></li>';
		}
		ul += '</ul>';
		if (this.argDict.listId){
			var ulList = $(this.argDict.listId);
			ulList.update(ul);
			this.liList = $$('#'+this.argDict.listId+' ul li');
			for (var i=0 ; i<this.liList.length; i++) {
				$(this.liList[i]).observe('click', function (evt) {
						var thisli = Event.element(evt),
						indx = ( (thisli.getAttribute('indx') != null) ? thisli.getAttribute('indx') : thisli.parentNode.getAttribute('indx') );
						that.showTab(indx);
					});
			}
		}
		this.showTab(this.argDict.defaultTab);
		this.currentTab = this.argDict.defaultTab;
	}
	this.showTab = function(indx) {
		for (var i=0; i<this.contents.length;i++) {
			if ( i != indx) {
				this.argDict.hideFunc(this.contents[i]);
				if (typeof(this.liList) != 'undefined')
					this.liList[i].removeClassName(this.argDict.tabActiveClass);
			} else {
				this.argDict.showFunc(this.contents[i]);
				if (typeof(this.liList) != 'undefined')
					this.liList[i].addClassName(this.argDict.tabActiveClass);
			}
		}
		this.currentTab = indx;
	}
	this.currentTabIndex = function() {return this.currentTab;}
	this.lengthTabs = function() {return this.heads.length;}
	this.nextTab = function () {this.showTab( ( ( this.currentTab < this.lengthTabs()-1) ? this.currentTab +1 : 0));}
	this.prevTab = function () {this.showTab( ( ( this.currentTab > 0) ? this.currentTab -1 : this.lengthTabs()-1));}
	this.lastTab = function () {this.showTab(this.lengthTabs() -1);}
	this.Initialice();
	return this;
}
// Extend Prototype
Element.addMethods({
	'TabManager': TabManager
	});
