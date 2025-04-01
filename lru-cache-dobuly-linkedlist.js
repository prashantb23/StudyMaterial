class Node {
    /**
     * Creates a new doubly linked list node with key-value pair.
     * @param {number} key - The key associated with the node.
     * @param {*} value - The value associated with the node.
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null; // Pointer to the previous node
        this.next = null; // Pointer to the next node
    }
}

class LRUCache {
    /**
     * Initializes the LRU Cache with a given capacity.
     * @param {number} capacity - The maximum number of elements the cache can hold.
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // Hash map to store key -> node mapping
        
        // Dummy head and tail to facilitate easy node removal and addition
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Removes a node from the doubly linked list.
     * @param {Node} node - The node to be removed.
     */
    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Adds a node to the end of the doubly linked list (most recently used position).
     * @param {Node} node - The node to be added.
     */
    add(node) {
        node.prev = this.tail.prev;
        node.next = this.tail;
        this.tail.prev.next = node;
        this.tail.prev = node;
    }

    /**
     * Retrieves a value from the cache if the key exists and moves the node to the most recently used position.
     * @param {number} key - The key to look up in the cache.
     * @returns {*} - The value associated with the key, or -1 if the key is not found.
     */
    get(key) {
        if (!this.cache.has(key)) {
            return -1; // Key not found
        }

        const node = this.cache.get(key);
        this.remove(node); // Remove from current position
        this.add(node); // Move to most recently used position
        return node.value;
    }

    /**
     * Inserts or updates a key-value pair in the cache.
     * If the cache exceeds its capacity, the least recently used (LRU) item is removed.
     * @param {number} key - The key to insert/update.
     * @param {*} value - The value associated with the key.
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // If key exists, remove it before updating
            const existingNode = this.cache.get(key);
            this.remove(existingNode);
        } else if (this.cache.size >= this.capacity) {
            // If cache is full, remove the least recently used (LRU) node
            const lruNode = this.head.next; // LRU node is next to head
            this.cache.delete(lruNode.key);
            this.remove(lruNode);
        }
        
        // Insert new node at the most recently used position
        const newNode = new Node(key, value);
        this.cache.set(key, newNode);
        this.add(newNode);
    }
}

// Example usage
const lru = new LRUCache(3);
lru.put(1, 'A');
lru.put(2, 'B');
lru.put(3, 'C');
console.log(lru.get(1)); // Output: A
lru.put(4, 'D'); // Removes key 2 as it is LRU
console.log(lru.get(2)); // Output: -1 (not found)
console.log(lru.get(3)); // Output: C
console.log(lru.get(4)); // Output: D
