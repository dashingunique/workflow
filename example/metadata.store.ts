import {InMemoryMetadataStore} from "../src/Metadata/InMemoryMetadataStore";

const places = {
    wait: {
        article: {
            title: 'demo article'
        },
    }
}

const transitions = {
    publish: {
        article: {
            title: 'demo article'
        },
        author: {
            name: 'demo author'
        }
    }
}

const workflow = {
    article: {
        title: 'demo article'
    }
}

const store = new InMemoryMetadataStore(workflow, places, transitions)

store.getWorkflowMetadata();
store.getWorkflowMetadata('article');

store.getPlaceMetadata('wait');
store.getPlaceMetadata('wait', 'article');

store.getTransitionMetadata('publish');
store.getTransitionMetadata('publish', 'author');