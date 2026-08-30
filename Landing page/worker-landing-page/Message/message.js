/* =========================
   SROT MESSAGES
========================= */


/* =========================
   ELEMENTS
========================= */

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const chatMessages =
    document.getElementById("chatMessages");

const messageSearch =
    document.getElementById("messageSearch");

const conversations =
    document.querySelectorAll(".conversation");

const tabs =
    document.querySelectorAll(".tab");



/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

    const text =
        messageInput.value.trim();

    if (!text) {
        return;
    }


    const message =
        document.createElement("div");

    message.className =
        "message sent";


    message.innerHTML = `

        <div>

            <div class="bubble">
                ${escapeHTML(text)}
            </div>

            <small>
                Just now · Sent
            </small>

        </div>

    `;


    chatMessages.appendChild(message);


    messageInput.value = "";


    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* =========================
   SEND BUTTON
========================= */

sendBtn.addEventListener(
    "click",
    sendMessage
);



/* =========================
   ENTER TO SEND
========================= */

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);



/* =========================
   CONVERSATION SWITCHING
========================= */

conversations.forEach(
    conversation => {

        conversation.addEventListener(
            "click",
            function() {

                conversations.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add("active");


                const dot =
                    this.querySelector(
                        ".unread-dot"
                    );


                if (dot) {
                    dot.remove();
                }


                const name =
                    this.dataset.name;


                updateChatHeader(name);

            }
        );

    }
);



/* =========================
   UPDATE CHAT HEADER
========================= */

function updateChatHeader(name) {

    const chatName =
        document.querySelector(
            ".chat-person strong"
        );

    const detailName =
        document.querySelector(
            ".person-card strong"
        );


    if (chatName) {
        chatName.textContent = name;
    }


    if (detailName) {
        detailName.textContent = name;
    }

}



/* =========================
   SEARCH CONVERSATIONS
========================= */

messageSearch.addEventListener(
    "input",
    function() {

        const search =
            this.value
                .toLowerCase()
                .trim();


        conversations.forEach(
            conversation => {

                const name =
                    conversation.dataset.name
                        .toLowerCase();


                const text =
                    conversation.textContent
                        .toLowerCase();


                if (
                    name.includes(search) ||
                    text.includes(search)
                ) {

                    conversation.style.display =
                        "flex";

                } else {

                    conversation.style.display =
                        "none";

                }

            }
        );

    }
);



/* =========================
   MESSAGE TABS
========================= */

tabs.forEach(
    tab => {

        tab.addEventListener(
            "click",
            function() {

                tabs.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                this.classList.add("active");


                const filter =
                    this.dataset.filter;


                conversations.forEach(
                    conversation => {

                        if (
                            filter === "all"
                        ) {

                            conversation.style.display =
                                "flex";

                            return;

                        }


                        if (
                            filter === "unread"
                        ) {

                            const status =
                                conversation.dataset.status;


                            conversation.style.display =
                                status === "unread"
                                    ? "flex"
                                    : "none";

                            return;

                        }


                        if (
                            filter === "archived"
                        ) {

                            /*
                             * No archived conversations
                             * in this demo yet.
                             */

                            conversation.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);



/* =========================
   ATTACHMENT BUTTON
========================= */

const attachBtn =
    document.getElementById("attachBtn");


if (attachBtn) {

    attachBtn.addEventListener(
        "click",
        function() {

            alert(
                "File attachment will be connected when SROT storage is added."
            );

        }
    );

}



/* =========================
   ARCHIVE
========================= */

const archiveBtn =
    document.querySelector(
        ".danger-btn"
    );


if (archiveBtn) {

    archiveBtn.addEventListener(
        "click",
        function() {

            const active =
                document.querySelector(
                    ".conversation.active"
                );


            if (!active) {
                return;
            }


            active.style.display =
                "none";


            alert(
                "Conversation archived."
            );

        }
    );

}



/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;
}



/* =========================
   INITIAL SCROLL
========================= */

chatMessages.scrollTop =
    chatMessages.scrollHeight;