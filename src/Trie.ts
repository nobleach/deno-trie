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
        // Set the new current node
        curr = curr.getChild(ch);

        // Increase the counter each go-round
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

  private getNode(word: string): TrieNode | null {
    let curr: TrieNode | null = this.root;
    for (let ch of word) {
      if (curr !== null) {
        curr = curr.getChild(ch);
      } else {
        return null;
      }
    }

    return curr;
  }
}
