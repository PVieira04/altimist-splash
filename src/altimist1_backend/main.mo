import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

actor email {

	// Create a stable array variable to leverage Orthogonal Persistence.
	stable var entries : [(Text)] = [];

	// Use a Buffer (mutable datatype) to store email addresses.
	let emailList = Buffer.fromArray<Text>(entries);

	// Function to add emails to the list.
	public func addEmail(email : Text) : async Text {

		// Conditional checks if argument 'email' already exists in buffer 'emailList'.
		if (Buffer.contains<Text>(emailList, email, Text.equal)) {
			return "This email has already been added to the mailing list."
		}
		else {
			emailList.add(email);
			return email # " has been added to the email list.";
		}
	};

	// Query function to check if email is in list.
	public query func checkEmail(email : Text) : async Bool {
		Buffer.contains<Text>(emailList, email, Text.equal)
	};

	// Query function to display all saved emails in the terminal.
	public query func showEmails() : async () {
		if (emailList.size() == 0) {
			Debug.print("Email list is empty")
		};
		Buffer.iterate<Text>(emailList, func (email) {
  			Debug.print(email);
		});
	};

	// Query function to display onr saved email in the terminal. UNDER CONSTRUCTION
	public query func showEmail() : async Text {
		if (emailList.size() == 0) {
			Debug.print("Email list is empty")
		};
		return "yes";
	};

	// Query function to return one email.
	public query func showOneEmail(email : Text) : async Text {
		return email
	};

	// Function to delete emails from mailing list.
	public func deleteEmail(email : Text) : async Text {
		if (Buffer.contains<Text>(emailList, email, Text.equal)) {
			let i = await emailIndex(email : Text);
			Debug.print(debug_show(i));
			let x = emailList.remove(i);
			return x # " has been removed from the mailing list."
		}
		else {
			return email # " does not exist in the mailing list."
		}
	};

	// Custom function to generate index from Motoko base library.
	// Avoids problem with the <?Nat> type.
	public func emailIndex(email : Text) : async Nat {
    	let size = emailList.size();
    	var i : Nat = 0;
    	while (i < size) {
    		if (emailList.get(i) == email) {
    			return i
    		};
    	i += 1
    	};
		0
	};

	// Function to run before updates to maintain state.
	system func preupgrade() {
		entries := Buffer.toArray<Text>(emailList);
	};

	// Function to run after updates to maintain state.
	system func postupgrade() {
		entries := [];
	};
}