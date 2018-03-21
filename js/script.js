/* #6 start the #external #action and say hello */
console.log("App is alive");

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */

var currentChannel;
currentChannel = sevenContinents;

var currentLocation = {
	latitude: 48.249586,
	longitude: 11.634431,
	what3words: "shelf.jetted.purple"
}

function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelObject.name;

    //#6 change the #channel #location
    document.querySelector('#channel-location').innerHTML = 'by <a href="http://w3w.co/' +
		channelObject.createdBy +
		'" target="_blank"><strong>' +
		channelObject.createdBy +
		'</strong></a>' ;

    /* #6 #liking channels on #click */
    $('#channel-star').removeClass('fas far');
    $('#channel-star').addClass(channelObject.starred ? ' fas' : ' far');

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');
    
    currentChannel = channelObject
}


/* #6 #liking a channel on #click */
function star() {
   $('#channel-star').toggleClass('far fas');
    
    currentChannel.starred = !currentChannel.starred;
    
    $('#channels li:contains(' + currentChannel.name +') .fa-star') .removeClass('fas far');
    $('#channels li:contains(' + currentChannel.name +') .fa-star').addClass(currentChannel.starred ? ' fas' : ' far');

}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

/** creating new Messages **/

function Message(text) {
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.latitude;
    this.createdOn = new Date(Date.now());
    this.expiresOn = new Date(Date.now() + 15 * 60 * 1000);
    this.text = text;
    this.own = true;
}

function createMessageElement(messageObject){
    var expirseIn = Math.round((messageObject.expiresOn - Date.now()) / 1000 / 60);
    return '<div class="message' + (messageObject.own ? ' own' : '') + '">' + 
        '<h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank"><strong>' + messageObject.createdBy + '</strong></a>' +
        messageObject.createdOn + '<em>' + expirseIn + ' min. left</em></h3>' +
        '<p>' + messageObject.text + '</p>' + 
        '<button>+5 min.</button>' +
        '</div>';
}

function sendMessage(){
    var message = new Message($('#message').val());
    console.log(message);
    
    $('#messages').append(createMessageElement(message));
    
    $('#messages').scrollTop(100000);
    
    $('#message').val('');
}


/* dynamic channels */
/** create this jQuery:
*<li onclick="switchChannel(channelObject.name)">
*<span class="channel-meta">
*<i class="far fa-star" alt="not starred"></i>
*<i class="fas fa-chevron-right" alt="select"></i>
*</span>
*</li>

*/
function createChannelElement(channelObject){
    var channel = $('<li>').text(channelObject.name);
    var meta = $('<span>').addClass('channel-meta').appendTo(channel);
    
    $('<i>').addClass('fa-star').addClass(channelObject.starred ? 'fas' : 'far').appendTo(meta);
    
    $('<span>').text(channelObject.expirsIN + ' min').appendTo(meta);
    $('<span>').text(channelObject.messageCount + ' new').appendTo(meta);
    
    $('<i>').addClass('fas fa-chevron-right').appendTo(meta);
    
    
    return channel;
}

function listChannels(){
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevenContinents));
    $('#channels ul').append(createChannelElement(killerApp));
    $('#channels ul').append(createChannelElement(firstPersonOnMars));
    $('#channels ul').append(createChannelElement(octoberfest));
}