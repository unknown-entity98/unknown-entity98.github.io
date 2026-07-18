---
layout: post
title: "Spoilt Brat Adventures - Exp 1.1"
author: Sameer Navuduri
tags: [LLMs, tokenization]
category: productivity
blurb: 'POV: you started out as a Python dev and "tried C" only to realize how much of a spoonfed spoilt brat you are :sed: '
---

*'POV: you started out as a Python dev and "tried C" only to realize how much of a spoonfed spoilt brat you are :sed: '*

Although we were forced to write C programs in high school, it was in college when we were really introduced to programming .feat _Python_. It is easy to learn and implement, YES. Python gives you an amazing illustration & visual of how things work. It is a great beginner-frtiendly tool to step foot into the dauting world of computers. To go deep into this ocean, is altogether another matter. Help me help you kill your time with my rant about my learning and unawareness.


---
"Ignorance is bl- oody terrible"

Nobody can know all the things in the world. If they did, they would not be in a plane we could perceive. These people or beings belong to a different dimension. We, however, are fools. We mistake capability for knowledge. We mistake experience for guarantee. Even the most experienced people make silly mistakes, so how great are we noobs? Well that is no excuse to *remain* a noob. 

Someone once told me:

> To be ignorant is not a heinous sin. But to remain ignorant, is one.

It struck me in the most crazy fashion. To believe that you are at the pinnacle is like imagining you are "invincible under the sun", as Musashi states in the manga series of _Vagabond_. The story starts with a young Shinmen Takezo who is wild and unruly, who sets out and fights relentlessly to conquer the world. He is willing to go to any lengths to become the strongest man standing. He gets into a lot of trouble, exiled by his own villagers and deemed a criminal. Manhunts are organized to kill him and somehow he survives. Then he uses this chance to travel to other cities and fight those stronger than him. It is then, he truly sees how farther he has to go, and goes on a lifelong quest to understanding himself, his motivation and confront his inner demons.


It was so easy I always studied and wrote code by myself. "Ez" is what I thought. "I'm a cool dev. I can do anything. I type fast. I should find it easy" - is precisely what I kept believing, until I tried doing DSA in Java in undergrad. Now, don't get wrong: I'm still confident in my Java Skills. I've built applets and a CPU emulator. I scored a B+ in my Java and DSA courses. It led to me to believe that I could easily pull off the same with C, for practice and get started with heavier ML library implementations soon enough. Maybe Java tests your patience and memory a little but it doesn't do anything that Python hasn't done before. 

Recently, I had built a [FastAPI RAG chatbot](https://github.com/unknown-entity98/agentic-rag-api). It led me to go from normal tokenizing to implementing sentence chunking with sufficient overlap and enhance the accuracy of the answers. As creating a chunker in Python was a walk in the park, I decided I would build one in C...

---

## What lay ahead 


Implementing an array in Python is as simple as -

```
  tokens = [] # initiate empty list

  for i in fread:
      tokens.append(i) #just go through the file stream object and add them to the array

  print(tokens)

```
Python takes care of the memory allocation, array creation, adding elements, extending its length, and finally, clearing the memory a.k.a garbage collection. It is immensely useful for demonstrating concepts. But a person who intends to understand the very fundamentals of computer science must not be satisfied with this snippet of code. They must dig deeper and find out what runs underneath.

In C, reading the file was no biggie. But creating an array was a challenge. As there are no classes, I realized that my TODO list looked something like:

1. create a new struct called *Array* and define its properties

2. define a function to invoke the creation and memory allocation of this array

3. define our own *append()* functiono to do the same thing that is done by Python's inbuilt method.

4. take care of extending its memory when filled

5. free memory after everything is done

---

## Hell would freeze over, before I fell in love with you

I began with the basic hello world and file reading experiment. Although I didn't understand how `strtok` worked, it started to make sense as I tested it out. To recreate what I had done with my Python chatbot, I decided to re-implement sentence chunking:
```
int main(){
    //count the sentences
    int num_sent = 0;

    //substitute for the sample document
    char buffer[1024];
    char line[256];
    FILE *f = fopen("simple.txt","r");
    if (f == NULL){
        fprintf(stderr, "could not open the file\n");
        return 1;
    }
    while (fgets(line, sizeof(line),f) != NULL){
        //printf("%s",line);
            char *token =strtok(line, ".");
            while (token!=NULL){
                token = strtok(NULL,".");
                num_sent++;
            }
    }
    fclose(f);
    return 0;
}
```
It didn't make sense to me, why I should add a buffer or why I couldn't just define an `str` like in python. C requires you to create an array of characters. Now thankfully this array was inbuilt. However, the chunk array was not.That meant I start learning to create my structure!

---

## Mary Had a Little Lamb - and She abused him !! :cri:


Imma continue this tomorrow morning gng - its past 1 PM and I gotta get some shut eye. But I will finish this story tomorrow amigo.

