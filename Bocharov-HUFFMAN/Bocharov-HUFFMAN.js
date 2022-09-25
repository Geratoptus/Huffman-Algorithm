function Node(letter, freq, used, father, code) { 
 //this = {}; 
    this.letter = letter; 
    this.freq = freq; 
    this.used = used; 
    this.father = father; 
    this.code = code; 
 //return this 
};
function Reverse_String(str){
	let split_string = str.split("");
	let reverse_array = split_string.reverse();
	let join_array = reverse_array.join("");
	return join_array;
}
 
let [,,inpStr] = [...process.argv];
inpStr = inpStr.toString();
let alph = new Array(); 

if (new Set(inpStr).size == 1){
	let code_table = new Array();
	code_table[inpStr[0]] = '0'
	console.log(code_table);
} 
else{
for (let i = 0; i < inpStr.length; i++) { 
    alph[inpStr.charAt(i)] = 0; 
} 
for (let i = 0; i < inpStr.length; i++) { 
    alph[inpStr.charAt(i)] += 1; 
}
let tree = new Array(); 
 
for (i in alph){ 
 let n = new Node(i, alph[i], 0, null, ''); 
 tree.push(n); 
}
let start_length = tree.length;
while (tree[tree.length - 1].letter.length != start_length){
	let first_minimum = Number.MAX_SAFE_INTEGER - 1, second_minimum = Number.MAX_SAFE_INTEGER;
	let first_minimum_index = 0; second_minimum_index = 0;
	let s1 = "", s2 = "";
	for (let i = 0; i < tree.length; i++){
		if (tree[i].used == 0){
			if (tree[i].freq < first_minimum){
				first_minimum = tree[i].freq;
				first_minimum_index = i;
			}
		}
	}

	for (let i = 0; i < tree.length; i++){
		if (tree[i].used == 0){
			if (tree[i].letter != tree[first_minimum_index].letter && tree[i].freq < second_minimum){
				second_minimum = tree[i].freq;
				second_minimum_index = i;
			}
		}
	}

	let new_letter = tree[first_minimum_index].letter + tree[second_minimum_index].letter;
	let new_freq = tree[first_minimum_index].freq + tree[second_minimum_index].freq;
	tree[first_minimum_index].used = 1;
	tree[second_minimum_index].used = 1;
	
	tree[first_minimum_index].code = '0';
	tree[second_minimum_index].code = '1';
	
	let new_element = new Node(new_letter, new_freq, 0, null, '');
	tree.push(new_element);
	tree[first_minimum_index].father = tree.length - 1;
	tree[second_minimum_index].father = tree.length - 1;

}

let code_table = new Array;
for (let i = 0; i < start_length; i++){
	let current_element = tree[i];
	let code = ''
	while (current_element.father != null){
		code += current_element.code;
		current_element = tree[current_element.father];
	code = Reverse_String(code);
	code_table[tree[i].letter] = code;
	}
	
}
console.log(code_table);
}
