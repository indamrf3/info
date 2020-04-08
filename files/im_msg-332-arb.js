var _gaq = _gaq || [];
var webAddress=location.hostname;
var Url_1 =webAddress.match(/^dev/)?"dev-":(webAddress.match(/^stg/))?"stg-":"";
var Url_2 =webAddress.match(/^dev/)?"stg-":(webAddress.match(/^stg/))?"stg-":"";
$('<link rel="stylesheet" type="text/css" href="//'+Url_1+'utils.imimg.com/im_msg/css/im_msg.css?v=18" >').appendTo("head");

var msg_hit_click = 0;
function dropdown_messages() {
    // body...
    var v4iilex_cookie = readCookie("v4iilex");
    var ImeshVisitorcookie = readCookie("ImeshVisitor");
    var utype = getparamVal(ImeshVisitorcookie, "utyp");
    var iso = getparamVal(ImeshVisitorcookie, "iso");

    if(v4iilex_cookie != undefined && v4iilex_cookie != "" && utype!= undefined && (utype == 'N' || utype == 'F')){
        if($('#ms_drop').html() != null){
            if($('#ms_drop').css('display') == 'block')
                $('#ms_drop').css("display","none");
            else{
                $('#ms_drop').css("display","block");
                event_ga_Track('Messages_Widget','Click_Toggle',glmodid,0,0);
            }
        }

        if(msg_hit_click == 0){
            msg_hit_click = 1;

            //code to check the jwt
            var imiss_cookie = readCookie("im_iss");
            imiss_cookie = imiss_cookie.split('=')[1];
            var base64Url = imiss_cookie.split('.')[1];
            var jwt_base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            var tect = JSON.parse(jwt_base64);
            var exp_time = tect["exp"];
            var current_time = Date.now() / 1000;
            if(current_time > exp_time){
                event_ga_Track('Messages_Widget','Display_Error_Expire',glmodid,0,1);
                window.location.href = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/";
                return;
            }

            var chat_msg_ui = '<div class="chat_box"><div class="chat_body" style="display:block"><div class="chat_user"><ul class="chat_message-user-name-section" id="chat_fetch_list"></div></div><div id="all_contact" style="text-align: center; display:none; background-color: white;padding: 9px 0px;border-radius: 3px;box-shadow: 1px 2px 6px 3px rgba(0,0,0,.15);"><span class="chat_view-all-contact-btn" onclick="all_contact_redirect();"> View All Messages</span></div></div>';
            $('#ms_drop').html(chat_msg_ui);
            $('#ms_drop').css("display","block");

            $(".chat_user").append('<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>');

            event_ga_Track('Messages_Widget','Click_widget',glmodid,0,0);
            contact_list();
        }
    }
    else if(v4iilex_cookie != undefined && v4iilex_cookie != "" && utype!= undefined && utype == 'P'){
        window.location.href = "https://"+Url_1+"seller.indiamart.com/messagecentre";
    }
    else if(ImeshVisitorcookie != undefined && ImeshVisitorcookie != "" && utype!= undefined && (utype == 'N' || utype == 'F')){
        if(iso == 'IN'){

            if($('#ms_drop').html() != null){
                if($('#ms_drop').css('display') == 'block'){
                    $('#ms_drop').css("display","none");
                    return;
                }
            }

            var chat_login_ui = '<div class="chat_box"><div class="chat_body" style="display:block"><div class="chat_user"><ul class="chat_message-user-name-section" id="chat_fetch_list"></div></div><div id="all_contact" style="text-align: center; display:none; background-color: white;padding: 9px 0px;border-radius: 3px;box-shadow: 1px 2px 6px 3px rgba(0,0,0,.15);"><span class="chat_view-all-contact-btn" onclick="all_contact_redirect();"> View All Messages</span></div></div>';

            $('#ms_drop').html(chat_login_ui);
            $('#ms_drop').css("display","block");

            $(".chat_user").append('<div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>');

            if (typeof(isImloginV1Open) !== "undefined" && isImloginV1Open == 1) {
                fullLoginForm('','','','MSG_Head');
            }
            else{
                $.ajaxSetup({cache:!0});
                $.getScript("//"+UrlPri+"utils.imimg.com/header/js/imloginv1-v19.js", function(){
                    fullLoginForm('','','','MSG_Head');
                });
            }

            return false;
        }
        else{
            window.location.href = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/";
            return false;
        }
    }
    else if(ImeshVisitorcookie != undefined && ImeshVisitorcookie != "" && utype!= undefined && utype == 'P'){
        window.location.href = "https://"+Url_1+"seller.indiamart.com/messagecentre";
        return false;
    }

}

$('#lshead, #help-center').hover(function() {
    $('#ms_drop').css("display","none");
});

$(document).mouseup(function (e){
    var container = $("#message-center");
    if (!container.is(e.target) && container.has(e.target).length === 0){
        $('#ms_drop').css("display","none");
    }
}); 

//******* GAtrack function ***************
function event_ga_Track(e, t, i, a, n) {
    if(typeof _gaq != "undefined"){
     _gaq.push(["_trackEvent", e, t, i, a, n]);    
    }
}

// **********function for ajax hit to get the contact service data**********

function contact_list() {
    var ImeshVisitorcookie = readCookie("ImeshVisitor");
    var gl_val = getparamVal(ImeshVisitorcookie, "glid");

    var im_iss = readCookie("im_iss");
    var AK = getparamVal(im_iss, "t");
    // type 1 to find contact list for all -- type 0 to find contact on limit & offset
    var params = {
        'token' : "imobile@15061981",
        'glusrid' : gl_val,
        'start' : 1,
        'end' : 10,
        'type' : 0,
        'modid' : glmodid,
        'count' : 1,
        'AK' : AK
    };

    $.ajax({
        url : "https://"+Url_2+"mapi.indiamart.com/wservce/enquiry/getContactList/",
        dataType : "json",
        type : "POST",
        crossDomain : true,
        data : params,
        success : function(response){
            contact_list_ui(response);
        },
        error : function (err) {
            console.log(err);
            event_ga_Track('Messages_Widget','Display_Error_Manipulation',glmodid,0,1);
            window.location.href = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/";
            //$(".chat_user").html('<div style="text-align: center;margin: 25px 40px;"><img class="arr1" id="msg_ico" style="padding-botton: 10px;width:37px;height:34px;margin-bottom: 5px;" src="//dev-utils.imimg.com/im_msg/image/speech-bubble.svg"><br><div style="margin: 5px 0px 40px 0px;color: #808080;"><a style="cursor: pointer;color: blue;" href="javascript:void(0)" onclick="ga_redirect(1);"> Click Here</a> to view your Messages.</div></div>');
        }
    });
    return false;
}

//*****************function to redirect the user to message centre*************
function get_id(contact_glid,buyer_name,type) {
    var webAddress=location.hostname;
    var url = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/?msg_widget=1&sup_glid="+btoa(contact_glid)+"&sup_type="+type;
    var win = window.open(url,'_blank');
    event_ga_Track('Messages_Widget','Click_Contact',glmodid,0,0);
}

function all_contact_redirect() {
    var webAddress=location.hostname;
    var url = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/?msg_widget=1";
    var win = window.open(url,'_blank');
    event_ga_Track('Messages_Widget','Click_View_All',glmodid,0,0);
}

function ga_redirect(val) {
    // body...
    if(val==1){
        event_ga_Track('Messages_Widget','Click_Error_Expire',glmodid,0,0);
        var url = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/";
        var win = window.open(url,'_blank');
    }
    if(val==2){
        event_ga_Track('Messages_Widget','Click_Post_Req',glmodid,0,0);
        var url = "https://"+Url_1+"my.indiamart.com/buyertools/postbl/";
        var win = window.open(url,'_blank');
    }
}


// *********to read data from cookie*************
function readCookie(name){
    var search = name + "=";
    if (document.cookie.length > 0){ 
        offset = document.cookie.indexOf(search)
        if (offset != -1) // if cookie exists
        { 
            offset += search.length
            end = document.cookie.indexOf(";", offset)  // set index of beginning of value
            if (end == -1) end = document.cookie.length // set index of end of cookie value
            return unescape(document.cookie.substring(offset, end));
        }
    }
    if (name == 'v4iilex'){ return readCookie('v4iil'); }
    return "";
}

function getparamVal(cookieStr, key){
    if( cookieStr > "") {
        var val = "|"+cookieStr+"|";
        var pattern = new RegExp(".*?\\|"+key+"=([^|]*).*|.*");
        return val.replace(pattern, "$1");
    }
    else {  return ""; }
}

//**********function to create the ui of contact list
function contact_list_ui(response){
    var resultlist = response.Response;
    if(resultlist != undefined){
        var stat = resultlist.Data.Status;
        var message = resultlist.Data.message;
        var responseCode = resultlist.Data.Code;

        var stat1 = resultlist.Data.STATUS;
        var message1 = resultlist.Data.MESSAGE;
        var Code1 = resultlist.Data.CODE;

        var stat2 = resultlist.Data.status;
        var count2 = resultlist.Data.count;
        var Code2 = resultlist.Data.code;
        var result_arr = resultlist.Data.result;
    }
    else{
        var stat1 = response.STATUS;
        var Code1 = response.CODE;
    }

    if(stat == 401 && message.match("No service Available")){
        //$(".chat_user").html('<div style="text-align: center;margin: 40px;"><span id="not_working">Something went Wrong.</span><br><div style="margin: 15px -2px 0px -4px;color: #808080;">Please Try again.<a style="cursor: pointer;" onclick="event_ga_Track(\'Messages_Widget\',\'Click_View_Again\',\''+glmodid+'\',0,0); contact_list();"> Click Here</a></div></div>');
        event_ga_Track('Messages_Widget','Display_Error_Service',glmodid,0,1);
        window.location.href = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/";
        return false;
    }

    if(stat1 == "FAILURE" && (Code1 == 400 || Code1 == 401 || Code1 == 402 || Code1 == 403)){
        //$(".chat_user").html('<div style="text-align: center;margin: 40px;"><span id="not_working">Something went Wrong.</span><br><div style="margin: 15px -2px 0px -4px;color: #808080;">Please Try again.<a style="cursor: pointer;" onclick="event_ga_Track(\'Messages_Widget\',\'Click_View_Again\',\''+glmodid+'\',0,0); contact_list();"> Click Here</a></div></div>');
        event_ga_Track('Messages_Widget','Display_Error_Token',glmodid,0,1);
        window.location.href = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/";
        return false;
    }

    if(Code1 == 204 && stat1 == "FAILURE"){
        event_ga_Track('Messages_Widget','Display_Error_Failure',glmodid,0,1);
        window.location.href = "https://"+Url_1+"my.indiamart.com/enquiry/messagecentre/";
        return false;
    }

    if(Code2 == 204 && stat2 == "failure" && message.match("No AddressList Found")){
        setTimeout(function(){ 
            $('.sk-fading-circle').css("display","none");
            if($('.chat_message-user-name-section').length == 0){
                $(".chat_user").html('<ul class="chat_message-user-name-section" id="chat_fetch_list">');
            }
            $(".chat_message-user-name-section").html('<div style="text-align: center;margin: 25px 40px;"><img class="arr1" id="msg_ico" style="padding-botton: 10px;width:37px;height:34px;margin-bottom: 5px;" src="//dev-utils.imimg.com/im_msg/image/speech-bubble.svg"><br><span id="not_working" style="color: #666666;font-size: 12px;line-height: 16px;">You have no Messages.</span><br><div style="margin: 10px -42px 0px -44px;color: #000000;font-size: 12px;line-height: 18px;"><span id="not_working_post_link">Kindly tell us your requirement to receive quotes from sellers.</span><br><button class="no_cntct_post_req" onclick="ga_redirect(2);">Post Requirement</button></div></div>');
        }, 500);
        event_ga_Track('Messages_Widget','Display_No_Contacts',glmodid,0,1);
        return false;
    }
    if(Code2 == 200 && stat2 == "success"){

        if(count2 == 0){
            $(".chat_message-user-name-section").html('<div style="text-align: center;margin: 25px 40px;"><img class="arr1" id="msg_ico" style="padding-botton: 10px;width:37px;height:34px;margin-bottom: 5px;" src="//dev-utils.imimg.com/im_msg/image/speech-bubble.svg"><br><span id="not_working" style="color: #666666;font-size: 12px;line-height: 16px;">You have no Messages.</span><br><div style="margin: 15px -42px 0px -44px;color: #000000;font-size: 12px;line-height: 17px;"><span id="not_working_post_link">Kindly tell us your requirement to receive quotes from verified suppliers.</span><br><button class="no_cntct_post_req" onclick="ga_redirect(2);">Get Quotes</button></div></div>');
            event_ga_Track('Messages_Widget','Display_No_Contacts',glmodid,0,1);
            return false;
        }
        var html = '<input type="hidden" id="count_contact" value="'+count2+'">';
        for (var i = 0; i < result_arr.length; i++) {

            var c = result_arr[i];

            var c_name          = c.contacts_name          === undefined || c.contacts_name          === null || c.contacts_name          === '' ? 'Buyer' : htmlEscape(c.contacts_name);
            c_name              = c_name.charAt(0).toUpperCase() + c_name.slice(1);

            var c_company       = c.contacts_company       === undefined || c.contacts_company       === null || c.contacts_company       === '' ? ''      : htmlEscape(c.contacts_company);
            var c_mobile        = c.contacts_mobile1       === undefined || c.contacts_mobile1       === null || c.contacts_mobile1       === '' ? ''      : htmlEscape(c.contacts_mobile1);
            var contacts_glid   = c.contacts_glid          === undefined || c.contacts_glid          === null || c.contacts_glid          === '' ? ''      : c.contacts_glid;
            var im_contact_id   = c.im_contact_id          === undefined || c.im_contact_id          === null || c.im_contact_id          === '' ? ''      : c.im_contact_id;
            var contacts_type   = c.contacts_type          === undefined || c.contacts_type          === null || c.contacts_type          === '' ? ''      : c.contacts_type;

            var c_country       = c.country_name           === undefined || c.country_name           === null || c.country_name           === '' ? ''      : htmlEscape(c.country_name);
            var c_state         = c.contact_state          === undefined || c.contact_state          === null || c.contact_state          === '' ? ''      : c.contact_state;
            var c_city          = c.contact_city           === undefined || c.contact_city           === null || c.contact_city           === '' ? ''      : htmlEscape(c.contact_city);

            var last_time       = c.last_contact_date_view === undefined || c.last_contact_date_view === null || c.last_contact_date_view === '' ? ''      : c.last_contact_date_view;
            var unrd_msg_cnt    = c.unread_message_cnt     === undefined || c.unread_message_cnt     === null || c.unread_message_cnt     === '' ? ''      : c.unread_message_cnt;
            var unread_class    = unrd_msg_cnt != '' ? 'unread' : '';

            var msg_read_status = c.msg_read_status        === undefined || c.msg_read_status        === null || c.msg_read_status        === '' ? ''      : c.msg_read_status;
            var product         = c.contact_last_product   === undefined || c.contact_last_product   === null || c.contact_last_product   === '' ? ''      : c.contact_last_product;
            var last_message    = c.last_message           === undefined || c.last_message           === null || c.last_message           === '' ? ''      : c.last_message;

            var lst_snipt = last_message;
            var ast_msg_cnct = '';
            if(lst_snipt == 'IndiaMART connected you with this seller')
                ast_msg_cnct = 'ast_msg_cnct';

            last_message        = last_message.replace('<', '&lt;');
            last_message        = last_message.replace('>', '&gt;');
            last_message        = last_message.length > 40 ? last_message.substr(0, 40) + "..." : last_message;

            if(c_name != '' || c_mobile != ''){

                html = html + '<li class="chat_user_name1" id ="'+contacts_glid+'" onclick = "get_id('+contacts_glid+',\''+c_name+'\','+contacts_type+');"><div class="c-div">';

                    var addr_display = '';
                    /*if(c_state != ''){
                        c_state = '<c_state>' + c_state + '</c_state>';
                        if(c_country != '' && c_country.toLowerCase() != 'india'){
                            addr_display = c_state + ', <c_country>' + c_country + '</c_country>';
                        }
                        else{
                            addr_display = c_state + '<c_country></c_country>';
                        }
                    }
                    else {*/
                        if(c_country != '' && c_country.toLowerCase() != 'india'){
                            addr_display = '<c_state></c_state><c_country>' + c_country + '</c_country>';
                        }
                        else{
                            addr_display = '<c_state></c_state><c_country></c_country>';
                        }
                    //}
                    if(c_city != ''){
                        if(c_state != '')
                            addr_display = '<c_city>' + c_city + '</c_city>' + addr_display;
                        else
                            addr_display = '<c_city>' + c_city + '</c_city>' + addr_display;
                    }
                    else{
                        addr_display = '<c_city></c_city>' + addr_display;
                    }

                    var disp_company     = c_company != '' ? ' <c_company>' + c_company + '</c_company>' : '<c_company></c_company>';

                    var coma = '';
                    if(c_company != '' && (c_city != '' || (c_country != '' && c_country.toLowerCase() != 'india')))
                        coma = ', ';

                    if(c_company != ''){
                        html = html + '<p class="chat_c_addr chat_wrd_elip">' + disp_company + coma + addr_display + '</p>';
                    }

                    if(c_company != '' && ( c_city != ''  || (c_country != '' && c_country.toLowerCase() != 'india')) )
                        html = html + '<br>';
                   
                //html = html + '</div><div class="chat_wrd_elip chat_contname chat_nm_mob">';
                html = html + '</div>';
                    var add_bold_cls = '';
                    if(c_company == ''){/* && c_country != '' && c_country.toLowerCase() == 'india'*//* && c_state == ''){*/
                        add_bold_cls ='font-size:14px; line-height:16px;color: #000000;padding: 7px 0px 0px 0px;';

                        html = html + '<p id="c_name" style="'+add_bold_cls+'">'+c_name+'</p>';
                    }
                    
                    /*if(c_mobile != ''){
                        html = html + '<span id="c_number'+i+'" class="chat_dib c_num">'+' ('+c_mobile+')</span>';
                    } else{
                        html = html + '<span id="c_number'+i+'" class="chat_dib c_num"></span>';
                    }*/

                    var lst_snpt_cls = 'chat_last-msg-snippet';
                    if(product != ''){
                        html = html + '<p class="clr chat_wrd_elip chat_prod-p-cls"><span class="chat_prd_icn_grey"></span><span class="chat_prdct_dsply">'+product+'</span></p>';
                    } else{
                        html = html + '</div><p class="clr wrd_elip"></p>';
                        lst_snpt_cls = 'chat_no-prdct-snippet';
                    }
                    
                html = html + '<p class="'+lst_snpt_cls+'chat_wrd_elip '+ast_msg_cnct+'">';
                html = html + ''+last_message+'</p>';
                html = html + '<p class="clr wrd_elip chat_rep-p-cls"><span class="chat_rep_icn"></span><span class="chat_rep_dsply">Reply</span>'
                    if(unrd_msg_cnt !='' && unrd_msg_cnt > 0)
                        html = html + '<span id="'+contacts_glid+'" class="chat_msg_unrd_cnt">'+unrd_msg_cnt+'</span>';
                html = html + '</li>';
            }
        }

        if($('.chat_message-user-name-section').length == 0){
            $(".chat_user").html('<ul class="chat_message-user-name-section" id="chat_fetch_list">');
        }

        $('.sk-fading-circle').css("display","none");
        $(".chat_message-user-name-section").html(html);
        if(count2 > 0){
            $('#all_contact').css("display","block");
            event_ga_Track('Messages_Widget','Display_Contacts',glmodid,0,1);
        }
    }
}

//**** to remove the html script tags ********
function htmlEscape(string) {
    var htmlEscapes = {'<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#x27;','/': '&#x2F;'};
    var htmlEscaper = /[<>"'\/]/g;
    return ('' + string).replace(htmlEscaper, function(match) {
        return htmlEscapes[match];
    });
}; 
