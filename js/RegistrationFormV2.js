///////////////////////////////////////////////////////////////////////
/// GLOBAL VARIABLES - PLEASE SET THESE ACCORDING TO IMPLEMENTATION ///
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
/// On version 2.0, we removed all drop down initialization and populate it from API datasource from cdn.cbresi.com.au which retrieves data from Eloqua REST API
///////////////////////////////////////////////////////////////////////

//var domainName = 'lucent.ondicomdigital.com'; // pulled from iframe query string - make static for individual sites
var styleUrl = 'http://' + domainName + '/css/style.css'; // built from domainName, can be statically set depending on needs
var projId = jQuery("#projectID").val(); // Salesforce Project ID
var thankYouPage = jQuery("#thankYouPage").val(); //Full URL to Thank You page for Eloqua to redirect to after successful form submission


// ELOQUA DATA LOOKUP:
var eloquaSiteId = '952923355'; // Eloqua Site ID (same as form)
var eloquaFormName = jQuery("#elqFormName").val(); // Eloqua Form Name (same as form)

///////////////////////////////////////////////////////////////////////
/// END GLOBAL VARIABLES //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// Initial setup for Eloqua Data Lookup.
var _elqQ = _elqQ || [];
_elqQ.push(['elqSetSiteId', eloquaSiteId]);
_elqQ.push(['elqTrackPageView']);

(function () {
    function async_load() {
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
        s.src = 'http://img.en25.com/i/elqCfg.min.js';
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    }
    if (window.addEventListener) window.addEventListener('DOMContentLoaded', async_load, false);
    else if (window.attachEvent) window.attachEvent('onload', async_load);
    updatePreferredBuyerType();
    updatePreferredPropertyType();
})();

function validateForm() {
    if (jQuery('input.buyerType:checked').length==0) {
        jQuery('input.buyerType').parent("p").addClass('parsley-error');
        return false;
    }
    if (jQuery('input.PreferredPropertyType:checked').length == 0) {
        jQuery('input.PreferredPropertyType').parent("p").addClass('parsley-error');
        return false;
    }
}

$('.buyerType').click(function () { 
    updatePreferredBuyerType();
});
$('.PreferredPropertyType').click(function () {
    updatePreferredPropertyType();
});
function updatePreferredBuyerType() {
    var selectedvalues = "";
    $('input.buyerType:checked').each(function () {
        if (selectedvalues == "")
            selectedvalues = this.value;
        else
            selectedvalues = selectedvalues + "::" + this.value;
    });
    jQuery("#delimitedBuyerType").val(selectedvalues)
}
function updatePreferredPropertyType() {
    var selectedvalues = "";
    $('input.PreferredPropertyType:checked').each(function () {
        if (selectedvalues == "")
            selectedvalues = this.value;
        else
            selectedvalues = selectedvalues + "::" + this.value;
    });
    
    jQuery("#delimitedPreferredPropertyType").val(selectedvalues)
}
// Initial variable creation and pre-population
var elqpush = '<Project_ID1>' + projId + '</Project_ID1><Language1>' + pageLang + '</Language1>';


// Initial function executed onload
function doInitial() {
    // Fill hidden form fields

    jQuery("#thankYouPage").val(thankYouPage);
    jQuery("#projectID").val(projId);
    /*
    document.getElementById("utmSource").value = utmSource;
    document.getElementById("utmMedium").value = utmMedium;
    document.getElementById("utmTerm").value = utmTerm;
    document.getElementById("utmContent").value = utmContent;
    document.getElementById("utmCampaign").value = utmCampaign;
    */
    // Assign parent frame style to iframe
    //$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', styleUrl));

    // Do Chinese translation if required
    if (pageLang == 'CH' || pageLang == 'ch') {
        translateToCh();
    }


    // Unhide after loading
    jQuery("body").removeClass("hideme");
}

// Eloqua Data Lookup function
function SetElqContent() {
    if (this.GetElqContentPersonalizationValue) {

        var elqForm;
        var blnFound = false;
        //find the form object from the form HTMLName
        for (var formIndex = 0; formIndex < document.forms.length; formIndex++) {
            for (var elemIndex = 0; elemIndex < document.forms[formIndex].length; elemIndex++) {
                if (document.forms[formIndex].elements[elemIndex].name == "elqFormName") {
                    if (document.forms[formIndex].elements[elemIndex].value == eloquaFormName) {
                        elqForm = document.forms[formIndex];
                        blnFound = true;
                        break;
                    }
                }
            }
            if (blnFound) break;
        }

    }
}

// Creates EloquaID for the visitor
function generateElqId() {
    var eloquaID = (jQuery("#emailAddress").val().toLowerCase() + jQuery("#projectID").val());
    jQuery("#eloquaID").val(eloquaID);
}



// Function to modify all form labels and headings to Chinese versions
function translateToCh() {
    jQuery('label_heading').html('&#27442;&#33719;&#24471;&#26356;&#35814;&#23613;&#30340;&#20449;&#24687;&#25110;&#32773;&#27004;&#23618;&#22270;&#65292;&#35831;&#22635;&#20889;&#20197;&#19979;&#34920;&#26684;&#12290;(&#35831;&#29992;&#33521;&#25991;)&#12290;');
    jQuery('label_fname').html('&#21517;*');
    jQuery('label_lname').html('&#22995;*');
    jQuery('label_phone').html('&#30005;&#35805;*');
    jQuery('label_email').html('&#30005;&#23376;&#37038;&#20214;*');
    jQuery('label_postcode').html('&#37038;&#32534;*');
    jQuery('label_howdidyouhear').html('&#24744;&#26159;&#22914;&#20309;&#24471;&#30693;&#25105;&#20204;&#30340;&#39033;&#30446;*');
    jQuery('label_mandatory').html('*&#24517;&#22635;&#39033;&#30446;');
    jQuery("#field5 option:first").html('&#24744;&#26159;&#22914;&#20309;&#24471;&#30693;&#25105;&#20204;&#30340;&#39033;&#30446;*')
}
