<%@ Page Language="C#" MasterPageFile="Site.Master" AutoEventWireup="true" Inherits="Rock.Web.UI.RockPage" %>

<asp:Content ID="ctMain" ContentPlaceHolderID="main" runat="server">

    <div class="position-fixed top-zero right-zero bottom-zero left-zero" style="background-color: #{% if pageBackgroundColorHex %}{{ pageBackgroundColorHex }}{% else %}ececec{% endif %}; z-index: -1;"></div>

    <div class="soft xs-soft-half hard-bottom xs-hard-bottom clearfix">

        <!-- Page Title -->
        {% if pageTitle %}
            {% set blockData = { 
                id: '',
                preTitle: '',
                titleSize: '',
                title: pageTitle,
                subtitle: pageSubtitle,
                tags: '',
                copy: ''
            } %}{% include "page-header.html" %}
        {% endif %}
        <Rock:PageIcon ID="PageIcon" runat="server" /> <h1><Rock:PageTitle ID="PageTitle" runat="server" /></h1>

        <!-- Breadcrumbs -->
        <Rock:PageBreadCrumbs ID="PageBreadCrumbs" runat="server" />

        <!-- Ajax Error -->
        <div class="alert alert-danger ajax-error no-index" style="display:none">
            <p><strong>Error</strong></p>
            <span class="ajax-error-message"></span>
        </div>

        <Rock:Zone Name="Feature" runat="server" />
        <Rock:Zone Name="Main" runat="server" />
        <Rock:Zone Name="Section A" runat="server" />
        <Rock:Zone Name="Section B" runat="server" />
        <Rock:Zone Name="Section C" runat="server" />
        <Rock:Zone Name="Section D" runat="server" />

    </div>

</asp:Content>