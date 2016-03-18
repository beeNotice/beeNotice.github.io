---
layout: article
title:  "ResourceBundle en UTF-8"
date:   2016-03-18
categories: [java]
tags: [encoding, tips]
excerpt: Par défaut les ResourceBundles utilisent l’encodage ISO-8859.<br/> Voici plusieurs méthodes permettant de de travailler avec de l’UTF-8
image: /img/code.png
---

## Utilisation de l'unicode

C'est la première suggestion que l'on trouve dans la [javadoc](http://docs.oracle.com/javase/7/docs/api/java/util/PropertyResourceBundle.html){:target="_blank"}

> Characters that cannot be represented in ISO-8859-1 encoding must be represented by Unicode Escapes as defined in section 3.3 of The Java™ Language Specification.

## Conversion post-chargement

{% highlight java %}

final ResourceBundle bundle = ResourceBundle.getBundle("bundle-name");
final String value = new String(aBundle.getString("key").getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8))

{% endhighlight %}

## Utilisation d'un java.util.ResourceBundle.Control

{% highlight java %}

public class UTF8Control extends ResourceBundle.Control {
    
    public ResourceBundle newBundle(...) {
        // The below is a copy of the default implementation.
        (...)
        if (stream != null) {
            try {
                // Only this line is changed to make it to read properties files as UTF-8.
                bundle = new PropertyResourceBundle(new InputStreamReader(stream, StandardCharsets.UTF_8));
            } finally {
                stream.close();
            }
        }
        return bundle;
    }
}

{% endhighlight %}

## Utilisation de properties

{% highlight java %}

InputStream utf8in = getClass().getClassLoader().getResourceAsStream("/path/to/utf8.properties");
Reader reader = new InputStreamReader(utf8in, StandardCharsets.UTF_8);
Properties props = new Properties();
props.load(reader);

{% endhighlight %}

Attention
: En utilisant cela, on perd les capacités de surcharge par langue.
