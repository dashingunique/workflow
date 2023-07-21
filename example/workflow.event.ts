import {
    InMemoryMetadataStore,
    Markable,
    Marking,
    MethodMarkingStore,
    Workflow,
    WorkflowEvent
} from "../src";
import {Definition} from "../src/Definition";
import {Transition} from "../src/Transition";


class Person implements Markable {
    getMarkName(): string {
        return "";
    }

    getMarking(): string | string[] {
        return undefined;
    }

    setMarking<T>(marking: string | string[], options?: T): void {
    }

}

type ArticleOptions = {
    title: string;
}

type AuthorOptions = {
    name: string;
}

type PlaceMetadataOptions = {
    wait: {
        article: ArticleOptions;
    }
}


type TransitionMetadataOptions = {
    publish: {
        article: ArticleOptions;
        author: AuthorOptions;
    }
}

type WorkflowMetadataOptions = {
    article: ArticleOptions;
}

const placeMetadata: PlaceMetadataOptions = {
    wait: {
        article: {
            title: 'demo article'
        },
    }
}

const transitionMetadata: TransitionMetadataOptions = {
    publish: {
        article: {
            title: 'demo article'
        },
        author: {
            name: 'demo author'
        }
    }
}

const workflowMetadata: WorkflowMetadataOptions = {
    article: {
        title: 'demo article'
    }
}

const metadataStore = new InMemoryMetadataStore(workflowMetadata, placeMetadata, transitionMetadata)

const places = new Set(['wait', 'publish']);

const publishTransition = new Transition('publish', 'reviewed', 'published');

const reviewTransition = new Transition('review', 'wait', 'reviewed');

const transitions = new Map([
    [publishTransition.getName(), publishTransition],
    [reviewTransition.getName(), reviewTransition],
]);

const definition = new Definition(places, transitions, metadataStore, 'wait');

const markingStore = new MethodMarkingStore();

const workflow = new Workflow(
    definition,
    markingStore,
    'article',
    undefined,
    ['workflow.entered']
);

const marking = new Marking();


const event = new WorkflowEvent(workflow, new Person(), marking);

event.getMetadata('article');
event.getMetadata('article', 'wait');
event.getMetadata(publishTransition, 'publish');


