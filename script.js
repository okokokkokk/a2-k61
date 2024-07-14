document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('timkiem');

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();

        // Reset highlight before searching again
        resetHighlight();

        if (searchText.length === 0) return;

        // Define elements to search within
        const searchableElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, span, div');

        searchableElements.forEach(function(element) {
            highlightText(element, searchText);
        });
    });

    function highlightText(element, searchText) {
        const regex = new RegExp(`(${searchText})`, 'gi');
        const nodes = Array.from(element.childNodes);

        nodes.forEach(node => {
            if (node.nodeType === 3) {
                // Node is a text node
                const html = node.nodeValue.replace(regex, '<span class="highlight">$1</span>');
                const newSpan = document.createElement('span');
                newSpan.innerHTML = html;
                node.parentNode.replaceChild(newSpan, node);
            } else if (node.nodeType === 1 && node.nodeName !== 'SPAN') {
                // Node is an element node and not a highlight span
                highlightText(node, searchText);
            }
        });
    }

    function resetHighlight() {
        const highlightedElements = document.querySelectorAll('.highlight');
        highlightedElements.forEach(function(element) {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
            parent.normalize();
        });
    }
});