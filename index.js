    let userForm = document.getElementById("userform");
    const retrieveentries = () => {
        let entries = localStorage.getItem("user-entries");
        if(entries){
            entries = JSON.parse(entries);
        } else{
            entries = []
        }
        return entries;
    }
    let userentries = retrieveentries();
    const isAgeValid = (dob) => {
        const currentDate = new Date();
        const birthDate = new Date(dob);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
    
        return age >= 18 && age <= 55;
    };
    const displayentries = () =>{
        const entries = retrieveentries();
        const tableentries = entries.map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const accepttermsCell = `<td class='border px-4 py-2'>${entry.accptterms}</td>`;

            const row = `<tr>${nameCell}  ${emailCell}   ${passwordCell}   ${dobCell}   ${accepttermsCell}</tr>`;
            return row;
        }).join("\n");
        const table = `<table class="table-auto w-full"><tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted Terms?</th>
        </tr>${tableentries} </table>`;

        let details = document.getElementById("user-entries");
        details.innerHTML = table;
    }

    const saveuserform = (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const accptterms = document.getElementById("acceptterms").checked;
        if (!isAgeValid(dob)) {
            alert("Sorry, you must be between 18 and 55 years old to register.");
            return;
        }

        const entry = {
            name,
            email,
            password,
            dob,
            accptterms
        };
        userentries.push(entry);
        localStorage.setItem("user-entries", JSON.stringify(userentries));
        displayentries();
    };
    userForm.addEventListener("submit", saveuserform);
    displayentries();

