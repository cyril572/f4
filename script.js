import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ========================================
// F4 FIREBASE CONFIGURATION
// ========================================

const firebaseConfig = {

    apiKey: "AIzaSyAjPnE3Km8yo_57t6kpUc7Jj9TtXqeBKew",

    authDomain: "website-53417.firebaseapp.com",

    projectId: "website-53417",

    storageBucket: "website-53417.firebasestorage.app",

    messagingSenderId: "1049856174962",

    appId: "1:1049856174962:web:dd00fbfdb5ed6bd66a8beb"

};


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ========================================
// MOBILE MENU
// ========================================

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });

}


// ========================================
// FOOTER YEAR
// ========================================

const copyright =
    document.getElementById("copyright");


if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} F4. Private organization.`;

}


// ========================================
// LOAD F4 MEMBERS
// ========================================

async function loadMembers() {

    const memberGrid =
        document.getElementById("memberGrid");

    const memberCount =
        document.getElementById("memberCount");


    if (!memberGrid) return;


    try {

        const membersRef =
            collection(db, "members");


        const snapshot =
            await getDocs(membersRef);


        memberGrid.innerHTML = "";


        if (snapshot.empty) {

            memberGrid.innerHTML = `

                <div class="member-placeholder">

                    <div class="placeholder-icon">
                        F4
                    </div>

                    <h3>
                        Members Coming Soon
                    </h3>

                    <p>
                        The official F4 roster
                        will appear here.
                    </p>

                </div>

            `;

            if (memberCount) {
                memberCount.textContent = "0";
            }

            return;
        }


        let totalMembers = 0;


        snapshot.forEach(document => {

            const member =
                document.data();


            totalMembers++;


            const card =
                document.createElement("article");


            card.className =
                "member-card";


            const image =
                member.image ||
                "https://via.placeholder.com/200";


            const name =
                member.name ||
                "Unknown Member";


            const rank =
                member.rank ||
                "Member";


            card.innerHTML = `

                <div class="member-image">

                    <img
                        src="${image}"
                        alt="${name}"
                    >

                </div>


                <h3>
                    ${name}
                </h3>


                <p>
                    ${rank}
                </p>

            `;


            memberGrid.appendChild(card);

        });


        if (memberCount) {

            memberCount.textContent =
                totalMembers;

        }


    } catch (error) {

        console.error(
            "Error loading F4 members:",
            error
        );


        memberGrid.innerHTML = `

            <div class="member-placeholder">

                <div class="placeholder-icon">
                    !
                </div>

                <h3>
                    Unable to load members
                </h3>

                <p>
                    Please check the Firebase
                    connection.
                </p>

            </div>

        `;

    }

}


// ========================================
// LOAD ANNOUNCEMENTS
// ========================================

async function loadAnnouncements() {

    const container =
        document.getElementById(
            "announcementContainer"
        );


    if (!container) return;


    try {

        const announcementsRef =
            collection(db, "announcements");


        const snapshot =
            await getDocs(
                announcementsRef
            );


        if (snapshot.empty) {

            return;

        }


        container.innerHTML = "";


        snapshot.forEach(document => {

            const announcement =
                document.data();


            const title =
                announcement.title ||
                "F4 Announcement";


            const message =
                announcement.message ||
                "";


            const card =
                document.createElement("article");


            card.className =
                "news-card";


            card.innerHTML = `

                <div class="news-icon">
                    F4
                </div>


                <div>

                    <small>
                        F4 HEADQUARTERS
                    </small>

                    <h3>
                        ${title}
                    </h3>

                    <p>
                        ${message}
                    </p>

                </div>

            `;


            container.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Error loading announcements:",
            error
        );

    }

}


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

});


// ========================================
// START F4 WEBSITE
// ========================================

loadMembers();

loadAnnouncements();


console.log(
    "🔥 F4 Headquarters connected to Firebase."
);