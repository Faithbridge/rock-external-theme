<%@ Page Language="C#" MasterPageFile="Site.Master" AutoEventWireup="true" Inherits="Rock.Web.UI.RockPage" %>

<asp:Content ID="ctMain" ContentPlaceHolderID="main" runat="server">

    {% if pageHeaderColorHex %}
        <div class="page-brand-bar" style="background-color: #{{ pageHeaderColorHex }}; opacity: .9;"></div>
    {% endif %}

    <div class="soft-top xs-soft-half-top">

        <!-- Page Title -->
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