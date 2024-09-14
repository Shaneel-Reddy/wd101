function setDateRestrictions() {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const minAcceptableDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];

    const dobInput = document.getElementById('dob');
    dobInput.setAttribute('max', minAcceptableDate);
    dobInput.setAttribute('min', minDate);
}

setDateRestrictions();

const userForm = document.getElementById("user-form");
const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dob-error');

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptedTerms ? "true" : "false"}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Dob</th>
                <th>Accepted terms?</th>
            </tr>
        </thead>
        <tbody>
            ${tableEntries}
        </tbody>
    </table>`;

    document.getElementById("user-entries").innerHTML = table;
};

const isValidDateOfBirth = (dob) => {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    return dob <= minAgeDate && dob >= maxAgeDate;
};

const saveUserForm = (event) => {
    event.preventDefault();
    
    const dobValue = new Date(document.getElementById('dob').value);
    if (!isValidDateOfBirth(dobValue)) {
        dobError.textContent = "Date of Birth must be between 18 and 55 years old.";
        console.log("Invalid Date of Birth:", dobValue);
        return;
    }

    dobError.textContent = '';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    console.log("Saved Entry:", entry);
    displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
