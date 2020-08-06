function immutable(source) {
    let cloned = {};

    function clone(source, target) {
        if (!source || typeof source !== 'object') {
            return source;
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                if (!target[key]) {
                    target[key] = Array.isArray(source[key]) ? [] : {};
                }
                    
                target[key] = clone(source[key], target[key]);
            }
        }

        return target;
    }

    return clone(source, cloned);
}

function Customer() {
    this.name = 'Rajiv Ranjan';
    this.phone = '9990656391';
    this.address = [{
        addressLine1: '725, 1st Block, 3rd Cross',
        addressLine2: 'HRBR Layout',
        pinCide: '560043',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
    }];

    this.assets = ['Mac', 'Windows'];
}

Customer.prototype.display = function () {
    console.log(`
    Name - ${this.name}
    Phone - ${this.phone}
    Address - ${this.address[0].addressLine1} 
    ${this.address[0].addressLine2} 
    ${this.address[0].city} 
    ${this.address[0].state} 
    ${this.address[0].pinCide} 
    `);
}

var customer = new Customer();

var copyOfCustomer = immutable(customer); // deep copy along with methods

Customer.prototype.print = function () {
    console.log(`Printing.....!!!`);
}

customer.name = 'Ranjan Rajiv'; // even if customer id modified, copyOfCustomer will remain unchanged.

console.log(copyOfCustomer);

// copyOfCustomer.display(); // display function also copied
// copyOfCustomer.print(); // display function also copied