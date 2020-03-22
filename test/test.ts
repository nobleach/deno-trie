import {
  assertEquals,
} from "./deps.ts";
import {
  Trie,
} from '../src/Trie.ts';

Deno.test({
  name: "Insert",
  fn(): void {
    const trie = new Trie();
    trie.insert('Mozambique');
    trie.insert('Mozilla');
    trie.insert('Trie');
    assertEquals(true, trie.find('Mozilla'));
  }
});

Deno.test({
  name: 'Returns false if word does not exist',
  fn(): void {
    const trie = new Trie();
    trie.insert('Mozambique');
    trie.insert('Mozilla');
    trie.insert('Trie');
    assertEquals(false, trie.find('Mozingo'));
    assertEquals(false, trie.find('Moz'));
  }
});

Deno.test({
  name: 'Returns true if we have the beginning of a word',
  fn(): void {
    const trie = new Trie();
    trie.insert('Mozambique');
    trie.insert('Mozilla');
    trie.insert('Trie');
    assertEquals(true, trie.startsWith('Moz'));
  }
});

await Deno.runTests;
