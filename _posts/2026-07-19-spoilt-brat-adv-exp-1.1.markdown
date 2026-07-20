---
layout: post
title: "Spoilt Brat Adventures - Exp 1.1"
author: Sameer Navuduri
tags: [LLMs, tokenization]
category: productivity
blurb: 'POV: you started out as a Python dev and "tried C" only to realize how much of a spoonfed spoilt brat you are :sed: '
---

*'POV: you started out as a Python dev and "tried C" only to realize how much of a spoonfed spoilt brat you are :sed: '*

Although we were forced to write C programs in high school, it was in college when we were really introduced to programming (feat. _Python_). It is easy to learn and implement, YES. Python gives you an amazing illustration & visual of how things work. It is a great beginner-friendly tool to step foot into the daunting world of computers. To go deep into this ocean, is altogether another matter. Help me help you kill your time with my rant about my learning and unawareness.


---
"Ignorance is bl- oody terrible"

Nobody can know all the things in the world. If they did, they would not be in a plane we could perceive. These people or beings belong to a different dimension. We, however, are fools. We mistake capability for knowledge. We mistake experience for guarantee. Even the most experienced people make silly mistakes, so how great are we noobs? Well that is no excuse to *remain* a noob. 

Someone once told me:

> To be ignorant is not a heinous sin. But to remain ignorant, is one.

It struck me in the most crazy fashion. To believe that you are at the pinnacle is like imagining you are "invincible under the sun", as Musashi states in the manga series of _Vagabond_. The story starts with a young Shinmen Takezo who is wild and unruly, who sets out and fights relentlessly to conquer the world. He is willing to go to any lengths to become the strongest man standing. He gets into a lot of trouble, exiled by his own villagers and deemed a criminal. Manhunts are organized to kill him and somehow he survives. Then he uses this chance to travel to other cities and fight those stronger than him. It is then, he truly sees how farther he has to go, and goes on a lifelong quest to understanding himself, his motivation and confront his inner demons.


It was always so easy — I just studied and wrote code by myself. "Ez" is what I thought. "I'm a cool dev. I can do anything. I type fast. I should find it easy" - is precisely what I kept believing, until I tried doing DSA in Java in undergrad. Now, don't get wrong: I'm still confident in my Java Skills. I've built applets and a CPU emulator. I scored a B+ in my Java and DSA courses. It led to me to believe that I could easily pull off the same with C, for practice and get started with heavier ML library implementations soon enough. Maybe Java tests your patience and memory a little but it doesn't do anything that Python hasn't done before. 

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

3. define our own *append()* function to do the same thing that is done by Python's inbuilt method.

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

## The First of the Many Curveballs I faced

Creating a struct only needed me to define three things:
- a pointer to an array of pointers
- a `size` var that denoted the current occupancy of the array
- a `capacity` var that defined the max possible occupancy of the said array

```
typedef struct{
    char **chunk; //array of strings
    int size; //current chunks
    int capacity; //total slots
} ChunkArray;
```

However, when I was defining the `create_array()` method, my mind was boggled. Although it took in only 1 parameter - `initial_capacity`, it needed me to allocate memory, and ensure that the pointer pointed to the right place. How would I allocate the required memory of this dynamic memory structure?

Afaik, any variable needed declaration first. Then I knew I had to allocate memory to the chunk pointer. Now I was not sure about how to assign space - _should i just give `malloc(arr->capacity)`? should I just declare a chunk var, perform malloc and then assign it to arr->chunk? What in the world should  I do ?_. This was my first botched attempt.
```
ChunkArray *create_array(int initial_capacity){
    ChunkArray *arr;
    arr->capacity = initial_capacity;
    **chunk = malloc(arr->capacity * arr-> size);
    arr->chunk = **chunk;
    return **arr;
}
```
❌❌ WRONG!!!!!

The errors rung my doorbell like the people coming to my house for a party. It was so wrong. I had forgot about initializing the `size` variable. My use of `malloc` was so horrid. That was when I realized: declare `chunk` as a pointer, then do `malloc( <number of elements> * <size of the data type>)`. THIS is the real fundamentals I needed to be comfortable with. And this is so beginner, past-me is somewhere wincing. But present-me finally gets it, and that felt stupidly good.

The corrected code looked like this:
```
ChunkArray *create_array(int initial_capacity){
    ChunkArray *arr = malloc(sizeof(ChunkArray));
    arr->capacity = initial_capacity;
    arr->size = 0;
    arr->chunk = malloc(initial_capacity *sizeof(char *));
    return arr;
}
```
:Sigh:
That was one hurdle out of the way. Now I needed to define two functions to _append_ and _free_ the array.

---

## Far from Home 

Now my append logic looked like this:

```
If (array size is full){
  double the capacity
}
append your chunk at the current `size` variable
increment the `size` var. 
```


TO double the capacity, I needed to use `realloc` whose use was easy to understand after I'd used `malloc` earlier. I just needed to give two args: 
1. the array pointer
2. the total array capacity as used with `malloc` earlier during its creation

It looked like - `char **new_ptr = realloc(arr->chunk, 2* arr->capacity * sizeof(char *));`
Ofc, then you increase its capacity too, as this struct has been updated.

Now how do I add the variable...? I thought it was `chunk[sizeof(chunk)]`, being the big brain Python programmer I am. Boy I was so wrong 😂. My dumb brain forgot about the `size` & `capacity` variables that I had written earlier. All I had to do was call `arr->chunk[size]`. My mind went :WA DA HELLL:

So I went ahead and added `strdup(chunk)` to my array, and I finally increased its size.

I thought I was done with the code, only to realize there was a `free_array()` function left. Although not as hard, it made me remember something fundamental. Let me give you a database analogy: In your database, you have two main tables, and they link to 5 other children tables. Now for some reason, you decide that it's a waste of memory and want to clear all tables. You just say - DELETE MY MAIN TABLES. But it doesn't work.... why? You start by clearing the children table first, then you clear the main tables. That is when you can successfully clear all the tables.


Now similarly, my job was to go through my array of pointers, empty the slot that each of these pointers addressed, AND THEN remove the pointers themselves. Had I removed the pointers instead of clearing their memory and detaching them, I would have been left with used but unreferenced memory. This is another key perspective that C brings to you: _garbage collection_. You clean up your own mess.

Thankfully, this didn't break my head like the other two:
```
void free_array(ChunkArray *arr){
    for(int i =  0;i < arr->size;i++){
        free(arr->chunk[i]);
        arr->chunk[i] = NULL;
    }
    free(arr->chunk);
    arr->chunk = NULL;
    free(arr);
    arr = NULL;
}
```

---

## What are you waiting for?

Now all I needed to do was use all of this in my `main()` function. And I was right about how I had used the `append()` function in place of printing each token and freeing the array. 
```
int main(){
    //creating an array
    ChunkArray *arr = create_array(4);

    //count the sentences
    int num_sent = 0;

    //substitute for the sample document
    char buffer[1024];
    char line[256];
    FILE *f = fopen("simple.txt","r");
    while (fgets(line, sizeof(line),f) != NULL){
        //printf("%s",line);
            char *token =strtok(line, ".");
            while (token!=NULL){
                append(*arr, *token);
                token = strtok(NULL,".");
                num_sent++;
            }
    }
    fclose(f);

    for(int i = 0; i < arr->size; i++){
        printf("%s\n", arr->chunk[i]);
    }

    free_array(*arr);  
    return 0;
}
```
*BUT* there is a flaw here, if my file read was not successful and returned NULL, who was to answer for my program's failure? So I go ahead and include an if cond:
```
    if (f == NULL){
        printf(stderr, "could not open the file\n");
        return 1;
    }
```
Then my compiler threw another error at my face:
```
.\chunker.c:64:16: warning: passing argument 1 of 'printf' from incompatible pointer type [-Wincompatible-pointer-types]
         printf(stderr, "could not open the file\n");
                ^
```
This led me to learn something important gng:

- *To print stderr, PLEASE USE FPRINTF.*

- *PLEASE USE PRINTF TO PRINT OTHER STUFF, LIKE A SANE HUMAN BEING*



This ate away my brain for a while. Now that I look at all this, I realize something fundamental. You need to be patient. Learning is like staying in a relationship and learning to love somebody. It requires patience and effort. No one can master something in 1 day. But you can certainly take it one step at a time. 

I managed to finish a rough v1 of my chunker. You can find my [chunker here](https://github.com/unknown-entity98/c-fundamentals/blob/main/chunker.c). Although not at its best, it certainly works and prints the chunk array for ya.

Try doing something that wrecks your mind. That forces you to sit down and meditate on it.

;)

