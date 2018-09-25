window.$ = window.jQuery = require('jquery');
var tippy = require('tippy.js').default;
// var SimpleBar = require('simplebar').default;


(function ($) {
    var bootUpInit = function() {
        if (!$) $ = jQuery;
    $.fn.DiscordMidgetChange = function(url) {
        var $e = $(this);
        var src = $e.attr("data-src");
        if(src && src.startsWith("http")) {
            if($e.css("background-image") != src)  {
                $e.attr("data-src", "none");
                setTimeout(function() {
                    $e.css("background-image", "url('"+src+"')");
                    $e.attr("data-src", src);
                }, 200);
            }
        } else if(src == "none") {
            if($e.css("background-image") != src) $e.css("background-image", "transparent");
        } else {
            $e.attr("data-src", "none");
            $e.css("background-image", "none");
        }
    };
    $.fn.DiscordMidgetInviteOpener = function(e) {
        if(!e || !e.data || !e.data.url) {
            e.preventDefault();
            return;
        }
        window.location.href = e.data.url;
    };
    $.fn.DiscordMidget = function (options) {
        var $discordMidget = $(this);
        window.MutationObserver = window.MutationObserver
    || window.WebKitMutationObserver
    || window.MozMutationObserver;
        var $ls = localStorage;
        options = options || {
            elements: $(this),
            Width: "100%",
            minWidth: "",
            minHeight: "600px",
            maxWidth: "100%",
            maxHeight: "100px",
            extraClasses: ""
        };
        $(this).addClass("discordMidget");
        if(parseInt(options.minHeight.split("px")[0]) > parseInt(options.maxHeight.split("px")[0])) options.maxHeight = options.minHeight; 
        var loadingChild = document.createElement("div");
        loadingChild.classList.add("discordMidget-loading");
        var loadingChildInner = document.createElement("div");
        var loadingChildInnerText = document.createElement("div");
        loadingChildInnerText.innerText = "Loading...";
        loadingChildInnerText.classList.add("discordMidget-loading-inner-text");
        var loadingChildInnerCircle = document.createElement("div");
        loadingChildInnerCircle.classList.add("discordMidget-loading-inner-circle");
        loadingChildInner.classList.add("discordMidget-loading-inner");
        var loadingChildInnerLogo = document.createElement("div");
        loadingChildInnerLogo.classList.add("discordMidget-loading-inner-logo");

        loadingChildInner.classList.add("discordMidget-loading-inner");
        loadingChildInner.appendChild(loadingChildInnerLogo);
        loadingChildInner.appendChild(loadingChildInnerCircle);
        loadingChild.appendChild(loadingChildInnerText);
        loadingChild.appendChild(loadingChildInner);
        loadingChild = $(this).prepend(loadingChild).find(".discordMidget-loading");

        var sidebarChild = document.createElement("div");
        var sidebarChildInner = document.createElement("div");
        var sidebarChildInnerAvatar = document.createElement("div");
        var sidebarChildInnerText = document.createElement("div");
        var sidebarChildClose = document.createElement("div");
        sidebarChildInner.classList.add("discordMidget-sidebar-inner");
        sidebarChildInnerAvatar.classList.add("discordMidget-sidebar-inner-avatar");
        sidebarChildInnerText.classList.add("discordMidget-sidebar-inner-text");
        sidebarChildInner.appendChild(sidebarChildInnerAvatar);
        sidebarChildInner.appendChild(sidebarChildInnerText);
        sidebarChild.classList.add("discordMidget-sidebar");
        sidebarChildClose.classList.add("discordMidget-sidebar-close");
        sidebarChild.appendChild(sidebarChildInner);
        sidebarChild.appendChild(sidebarChildClose);
        $(this).append(sidebarChild);

        if (options.extraClasses.length > 0) $(this).addClass(extraClasses);
        if (options.Width.length > 0) $(this).css("width", options.Width);
        if (options.minHeight.length > 0) $(this).css("min-height", options.minHeight);
        if (options.minWidth.length > 0) $(this).css("min-width", options.minWidth);
        if (options.maxHeight.length > 0) $(this).css("max-height", options.maxHeight);
        if (options.maxWidth.length > 0) $(this).css("max-width", options.maxWidth);


        function getWidgetUri(Id) {
            return "https://ptb.discordapp.com/api/guilds/" + (Id) + "/widget.json";
        }
        function inHours(d1, d2) {
            return parseInt((d2-d1)/(3600*1000));
        }
        options.elements.each(function (k, e) {
            var Id = $(e).attr("data-discordId");

            var titleChild = document.createElement("div");
            titleChild.classList.add("discordMidget-title");
            var titleText = document.createElement("span");
            var titleContainer = document.createElement("div");
            titleContainer.classList.add("discordMidget-title-container");
            var titleAvatar = document.createElement("div");
            titleAvatar.classList.add("discordMidget-title-avatar");
            titleAvatar.setAttribute("data-src", "none");
            var titleIcon = document.createElement("div");
            titleIcon.classList.add("discordMidget-title-icon", "discordMidget-branding");
            titleContainer.appendChild(titleIcon);
            titleContainer.appendChild(titleText);
            titleContainer.appendChild(titleAvatar);
            titleChild.appendChild(titleContainer);
            $(this).append(titleChild);
            var memberChild = document.createElement("div");
            memberChild.classList.add("discordMidget-member");
            var memberChildWrapper = document.createElement("div");
            memberChildWrapper.classList.add('discordMidget-member-wrapper');
            memberChild.appendChild(memberChildWrapper);
            $(this).append(memberChild);
            $(memberChild).css("max-height", options.maxHeight);
            var footerChild = document.createElement("div");
            footerChild.classList.add("discordMidget-footer");

            var footerJoin = document.createElement("button");
            footerJoin.innerText = "Join";
            footerJoin.classList.add("btn", "btn-block");
            footerChild.appendChild(footerJoin);
            $(this).append(footerChild);

            console.log("Discord ID: " + Id);
            var disc = $ls.getItem("discordMidget:Server:" + Id);
            var discData = null;
            var query = null;
            //console.log((new Date(disc.created_at), new Date(Date.now())));
            if (disc && disc.created_at && (((disc.created_at).getTime() - Date.now())*3600*1000) < 1) {
                console.log("cached");
                discData = JSON.parse(disc);
                discData.IsNewData = false;
            } else {
                console.log("not yet cached");
                query = ($.getJSON(getWidgetUri(Id),
            function(r) {
                console.log(r);
                discData = r;
                discData.IsNewData = true;
                discData.created_at = new Date();
                r = discData;
                if (r.name) {
                    if(disc) $ls.removeItem("discordMidget:Server:" + Id);
                    $ls.setItem("discordMidget:Server:" + Id, JSON.stringify(r));
                }
            }).fail(
                    function (err) {
                        var data = err ? err.responseJSON : null;
                        if(err && data && data.code) {
                            $(loadingChildInnerCircle).css("border-top-color","var(--danger)");
                            $(loadingChildInnerLogo).addClass("window-close");
                            $(loadingChildInnerText).html("<div>"+(data.code || "?") + " - " + (data.message || "Unknown Error") + "</div>");
                            var btn = "<div class='discordMidget-window-refresh refresh' data-run='window-refresh'></div>";
                            $(loadingChild).append(btn);
                        
                        $(loadingChild).find('[data-run="window-refresh"]').on('click', function() {
                            window.location.reload();
                        })

                        }
                    }));
            }
            $.when(query).done(function () {
                $(titleText).text(discData.name);
                if (discData.members) {
                    discData.members = discData.members.sort(function(a,b) {
                        if(a.status == "online" && a.game) return -1;
                        return 0;
                    });
                    if(!discData.instant_invite) {
                        $(footerJoin).text("No Invite available").addClass("btn-danger");
                    } else {
                        $(footerJoin).on('click', { url: discData.instant_invite }, $.fn.DiscordMidgetInviteOpener);
                    }
                    discData.members.forEach(function(member) {
                        var user = document.createElement("div");
                        user.classList.add("discordMidget-user-row");
                        user.addEventListener("click", function(ev) {
                            var allUsers = [];
                            allUsers = Array.from(document.getElementsByClassName("discordMidget-user-row-focus"));
                            var sameRemoval = false;
                            if(this.classList.contains("discordMidget-user-row-focus")) {
                                allUsers.splice(allUsers.indexOf(this), 1);
                                this.classList.remove("discordMidget-user-row-focus");
                                sameRemoval = true;
                            } else {
                                var selectedUsers = null;
                                allUsers.forEach(function(v) {
                                    v.classList.remove("discordMidget-user-row-focus");
                                });
                                this.classList.add("discordMidget-user-row-focus");

                            }
                            var url = $(this).find("img").attr("src");
                            $(titleAvatar).attr('data-src', allUsers.length == 0 && sameRemoval ? "none" : url);
                            $(titleAvatar).attr('data-id', member.id);
                            $(titleAvatar).DiscordMidgetChange();
                        });

                        var userImage = document.createElement("div");
                        userImage.classList.add("discordMidget-user-image");
                        var userImageSrc = document.createElement("img");
                        userImageSrc.src = member.avatar_url;
                        userImage.appendChild(userImageSrc);
                        var userName = document.createElement("span");
                        userName.classList.add("discordMidget-user-name");
                        userName.innerHTML = member.username +'<small class="discordMidget-text-muted">#'+member.discriminator+'</small>';
                        if(member.bot) userName.innerHTML += '<span class="discordMidget-badge" style="margin-left: .2em">BOT</span>';
                        if(member.status == "idle") userImage.classList.add("discordMidget-status-warning");
                        if(member.status == "online") userImage.classList.add("discordMidget-status-online");
                        if(member.status == "dnd") userImage.classList.add("discordMidget-status-dnd");
                        user.appendChild(userImage);
                        user.appendChild(userName);
                        $(memberChildWrapper).append(user);
                    });
                    var sidebar = $discordMidget.find(".discordMidget-sidebar");
                    sidebar.find(".discordMidget-sidebar-close").on("click", function() {
                        sidebar.removeClass("open");
                    });
                    $(titleAvatar).on("click",function(e) {
                        if(!sidebar.hasClass("open") && $(this).attr("data-src") != "none") {
                            var member = discData.members.find(function(x) { return x.id == $(titleAvatar).attr("data-id"); });
                            if(!member) return;
                            var sidebarInner = sidebar.find(".discordMidget-sidebar-inner");
                            var sidebarInnerAvatar = $(sidebarChildInnerAvatar);
                            if(member.status == "idle") sidebarInnerAvatar.addClass("discordMidget-status-warning");
                            if(member.status == "online") sidebarInnerAvatar.addClass("discordMidget-status-online");
                            if(member.status == "dnd") sidebarInnerAvatar.addClass("discordMidget-status-dnd");
                            if(member.game) {
                                sidebarInnerAvatar.addClass("discordMidget-status-game");
                                $(sidebarChildInnerText).html("<div class='discordMidget-badge discordMidget-mb-1'><b>Playing</b><div>" + member.game.name + "</div></div>");
                            } else {
                                $(sidebarChildInnerText).text("");
                            }
                            sidebarInnerAvatar.css("background-image", "url("+member.avatar_url+")");
                            sidebarInnerAvatar.attr("title", member.username + "#" + member.discriminator);
                            tippy(sidebarChildInnerAvatar);
                            sidebar.addClass("open");
                        }
                    });
                    // new SimpleBar(memberChild);
                }
            }).then(function () {
                setTimeout(function() {
                    $(loadingChild).css('opacity', 0);
                    $(loadingChild).css('transform', 'scale(0)');
                }, 500);
                //$(loadingChild).animate({opacity: '0'}, {queue: false, duration: 1000});
            });

        });
    };
    };
    if (window.jQuery) {
        bootUpInit();
      }
})(jQuery);

