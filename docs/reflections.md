---
title: Reflections
permalink: reflections.html
---

# Reflections

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nunc mauris, congue quis porta id, ultricies eu erat. Aenean at lacinia augue. Suspendisse mollis sapien eu sapien porttitor, ac pellentesque purus vulputate. Ut nec dictum velit, et fringilla orci. Praesent eu dapibus ante, at venenatis leo. Praesent dolor lacus, fringilla convallis nisi eget, viverra bibendum nisi. Aliquam efficitur tincidunt elementum. Ut eget volutpat sapien. Maecenas rutrum efficitur purus id condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 

<h3>Toc</h3> 
<ul>
{% for page in site.reflections %}
    <li>
		<a href="{{ page.url | prepend:site.baseurl }}">
        <span class="toc-title">{{ page.title.long  | markdownify | remove: '<p>' | remove: '</p>' }}</span>
      	</a><br>
      	<span class="toc-author">{{ page.author.name }}</span>
    </li>
{% endfor %} 
</ul>

