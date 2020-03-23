class TrieNode {
  private children = new Map<string, TrieNode>();
  public isEnd: boolean;

  constructor() {
    this.isEnd = false;
  }

  public putChildIfAbsent(ch: string): void {
    if (!this.children.has(ch)) {
      this.children.set(ch, new TrieNode());
    }
  }

  public getChild(ch: string): TrieNode | null {
    return this.children.get(ch) || null;
  }
}

export class Trie {
  private root = new TrieNode();

  public insert(word: string): void {
    // Start at the root
    let curr: TrieNode | null = this.root;
    let level = 0;
    // Iterate string add to TrieNode's internal map if
    // value doesn't already exist
    for (let ch of word) {
      if (curr !== null) {
        curr.putChildIfAbsent(ch);
        // Set the new current TrieNode
        // for the next iteration
        curr = curr.getChild(ch);

        // Increase the counter each iteration
        // if we've reached the length of the word
        // set the isEnd boolean to true
        if (curr !== null && level++ === word.length - 1) {
          curr.isEnd = true;
        }
      }
    }
  }

  public find(word: string): boolean {
    const node = this.getNode(word);
    if (node && node.isEnd) {
      return true;
    }

    return false;

  }

  public startsWith(prefix: string): boolean {
    return this.getNode(prefix) ? true : false;
  }

  public delete(word: string): void {
    if (!this.find(word)) {
      return;
    }

    let curr: TrieNode | null = this.root;
    for (let ch of word) {
      let child = curr.getChild(ch);
    }
  }

  private getNode(word: string): TrieNode | null {
    let curr: TrieNode | null = this.root;
    // Start at root and traverse down
    // letter by letter
    for (let ch of word) {
      if (curr !== null) {
        // set curr to next letter in word
        curr = curr.getChild(ch);
      } else {
        // If we hit a null pointer,
        // return null
        return null;
      }
    }

    return curr;
  }
}
