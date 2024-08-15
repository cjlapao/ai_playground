import Layout from '../Layout/Layout'
import './DocumentRender.scss'
import Button from '@mui/material/Button'
import Markdown from 'markdown-to-jsx'
import { Prism } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import home from '../Documents/Home.md'
import faceDetection from '../Documents/FaceDetection.md'
import { Typography } from '@mui/material';
import { FC } from 'react';

export interface props {
    documentName: string
}

interface codeProps {
    className: string,
    children: string
}

const CodeBlock: FC<codeProps> = ({ className, children }) => {
    const language = className ? className.split("-")[1] : "";
    console.log(typeof className)
    console.log(typeof children)
    return (
        <Prism
            language={language}
            style={darcula}
            showLineNumbers={true}
        >
            {children}
        </Prism>
    );
};

interface document {
    documentName: string
    documentContent: string
}

const notFoundDocument: document = {
    documentName: 'NOT_FOUND',
    documentContent: '# Not found'
}

const documentList: document[] = [
    {
        documentName: 'HOME',
        documentContent: home
    },
    {
        documentName: 'FACE_DETECTION',
        documentContent: faceDetection
    }
]

function getDocumentContent(name: string): string {
    const normalizedName = name.toUpperCase().replaceAll(' ', '_')
    const docs = documentList.filter((doc) => doc.documentName === normalizedName)
    if (!docs || docs.length == 0 || docs.length > 1) {
        return notFoundDocument.documentContent
    } else {
        return docs[0].documentContent
    }
}

export default function Docs(props: props) {
    console.log(props)
    return (
        <Layout>
            <div className="document-root">
                <div className='document-render'>
                    <Typography>
                        <Markdown options={{
                            overrides: {
                                code: CodeBlock,
                            },
                        }}>
                            {getDocumentContent(props.documentName)}
                        </Markdown>
                    </Typography>
                </div>
                <div className='actions-root'>
                    <Button variant='contained' href='/'>Back</Button>
                </div>
            </div>
        </Layout>
    )
}