const jobs = [

  [
    'Furniture Moving',
    'Home Relocation Services',
    '📦',
    'i1',
    'Lalitpur, Nepal',
    '2.1 km away',
    'Today, 4:00 PM',
    '~2 hours',
    'Rs. 1,000',
    'Moving & Carrying',
    '2 people needed',
    'New'
  ],

  [
    'Event Helper',
    'ABC Events',
    ' 🗓️',
    'i2',
    'Kathmandu',
    '3.4 km away',
    'Tomorrow, 9:00 AM',
    '~3 hours',
    'Rs. 1,500',
    'Event Help',
    '3 people needed',
    'Urgent'
  ],

  [
    'Grocery Pickup & Delivery',
    'Sasto Mart',
    '🛵',
    'i3',
    'Kathmandu',
    '1.2 km away',
    'Today, 6:00 PM',
    '~1 hour',
    'Rs. 400',
    'Delivery & Errands',
    '1 person needed',
    'New'
  ],

  [
    'Home Cleaning',
    'Sunita Shrestha',
    '🧹',
    'i4',
    'Bhaktapur, Nepal',
    '2.8 km away',
    'Tomorrow, 10:00 AM',
    '~3 hours',
    'Rs. 1,200',
    'Cleaning',
    '1 person needed',
    'Urgent'
  ]

];


const list = document.querySelector('#jobList');


function renderJobs() {

  list.innerHTML = jobs.map((job, index) => {

    return `

      <article
        class="job"
        data-title="${job[0]}"
      >

        <div class="jobicon ${job[3]}">
          ${job[2]}
        </div>


        <div>

          <div class="title">

            <h3>

              ${job[0]}

              <em class="${job[11] === 'Urgent' ? 'u' : ''}">
                ${job[11]}
              </em>

            </h3>


            <button class="save">
              ♡
            </button>

          </div>


          <div class="company">

            ${job[1]}

            <span class="verified">
              ✓
            </span>

          </div>


          <div class="meta">

            <span>
              <span class="material-symbols-outlined meta-icon">location_on</span> ${job[4]}
              <br>
              <small>
                ${job[5]}
              </small>
            </span>


            <span>
              ◷ ${job[6]}
              <br>
              <small>
                ${job[7]}
              </small>
            </span>


            <span>
              ~ <b>${job[8]}</b>
              <br>
              <small>
                Fixed price
              </small>
            </span>

          </div>


          <div class="tags">

            <span>
              ${job[9]}
            </span>

            <span>
              ${job[10]}
            </span>

            <small>
              Posted ${index ? index + 'h' : '30m'} ago
            </small>

          </div>

        </div>


        <div class="actions">

          <button class="details">
            View Details
          </button>

          <button class="apply">
            Apply Now
          </button>

        </div>

      </article>

    `;

  }).join('');

}


renderJobs();



/* =========================
   TOAST
========================= */

const toast =
  document.querySelector('#toast');


function msg(text) {

  toast.textContent = text;

  toast.classList.add('show');

  clearTimeout(window.tm);

  window.tm = setTimeout(() => {

    toast.classList.remove('show');

  }, 2200);

}



/* =========================
   JOB BUTTONS
========================= */

document.addEventListener('click', (event) => {


  /* SAVE JOB */

  const save =
    event.target.closest('.save');


  if (save) {

    save.classList.toggle('saved');


    save.textContent =
      save.classList.contains('saved')
        ? '♥'
        : '♡';


    msg(
      save.classList.contains('saved')
        ? 'Job saved.'
        : 'Removed from saved jobs.'
    );

  }



  /* APPLY */

  const apply =
    event.target.closest('.apply');


  if (apply) {

    apply.textContent =
      'Applied ✓';

    apply.disabled = true;

    msg('Application sent.');

  }



  /* VIEW DETAILS */

  const details =
    event.target.closest('.details');


  if (details) {

    msg(
      'Job details will open here.'
    );

  }
});


 /* =========================
   IN-PAGE SECTION SWITCHER
========================= */

const sideLinks =
  document.querySelectorAll('.side a[data-section]');

const sections =
  document.querySelectorAll('.page-section');


function showSection(sectionName) {

  /* Hide every section */

  sections.forEach(section => {

    section.classList.remove('active-section');

  });


  /* Show selected section */

  const selected =
    document.getElementById(sectionName);

  if (selected) {

    selected.classList.add('active-section');

  }


  /* Update sidebar active item */

  sideLinks.forEach(link => {

    link.classList.remove('active');

  });


  const activeLink =
    document.querySelector(
      `.side a[data-section="${sectionName}"]`
    );

  if (activeLink) {

    activeLink.classList.add('active');

  }


  /* Update URL hash */

  history.replaceState(
    null,
    '',
    '#' + sectionName
  );


  /* Scroll to top */

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}


/* Sidebar click */

sideLinks.forEach(link => {

  link.addEventListener('click', function(event) {

    event.preventDefault();

    const sectionName =
      this.dataset.section;

    showSection(sectionName);

  });

});





/* =========================
   POPULAR SEARCHES
========================= */

document
  .querySelectorAll('.popular button')
  .forEach(button => {

    button.onclick = () => {

      document
        .querySelector('[data-key="work"]')
        .childNodes[0]
        .textContent =
        button.textContent + ' ';


      msg(
        'Searching ' +
        button.textContent +
        ' jobs.'
      );

    };

  });



/* =========================
   SEARCH OPTIONS
========================= */

const options = {

  work: [
    'Delivery',
    'Moving',
    'Cleaning',
    'Event Helper'
  ],

  location: [
    'Kathmandu',
    'Lalitpur',
    'Bhaktapur',
    'Pokhara'
  ],

  when: [
    'Anytime',
    'Today',
    'Tomorrow',
    'This week'
  ],

  distance: [
    'Within 2 km',
    'Within 5 km',
    'Within 10 km',
    'Any distance'
  ]

};



document
  .querySelectorAll(
    '.search label button'
  )
  .forEach(button => {

    button.onclick = () => {

      const values =
        options[button.dataset.key];


      const current =
        button.textContent.trim();


      const currentIndex =
        values.indexOf(current);


      const next =
        values[
          (currentIndex + 1) %
          values.length
        ];


      button.childNodes[0]
        .textContent =
        next + ' ';

    };

  });



/* =========================
   FIND JOBS
========================= */

document
  .querySelector('#find')
  .onclick = () => {

    document
      .querySelector('#jobList')
      .scrollIntoView({
        behavior: 'smooth'
      });


    msg(
      'Showing matching jobs.'
    );

  };



/* =========================
   MORE JOBS
========================= */

document
  .querySelector('#more')
  .onclick = () => {

    msg(
      'More nearby jobs will load here.'
    );

  };



/* =========================
   PROFILE
========================= */

document
  .querySelector('#improve')
  .onclick = () => {

    msg(
      'Profile editor will open here.'
    );

  };


document
  .querySelector('#update')
  .onclick = () => {

    msg(
      'Let’s complete your profile.'
    );

  };


document
  .querySelector('#profile')
  .onclick = () => {

    msg(
      'Profile menu.'
    );

  };